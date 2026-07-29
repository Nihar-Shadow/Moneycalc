import { memo, useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartSpec } from "@/lib/calculators/types";
import { formatCompact, type CurrencyCode } from "@/lib/format";

const PIE_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

const axisProps = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  backgroundColor: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  color: "var(--color-popover-foreground)",
  fontSize: 12,
};

interface ResultChartProps {
  chart: ChartSpec;
  currency: CurrencyCode;
}

function ResultChart({ chart, currency }: ResultChartProps) {
  const xKey = chart.xKey ?? "year";

  const processedData = useMemo(() => {
    return chart.data.map((d) => ({
      ...d,
      key: `${(d as Record<string, unknown>)[xKey] as string}-${JSON.stringify(d)}`,
    }));
  }, [chart.data, xKey]);

  const formattedData = useMemo(() => {
    if (chart.type === "pie") {
      return processedData.map((d) => ({
        ...d,
        value: Number((d as Record<string, unknown>)["value"]),
      }));
    }
    return processedData;
  }, [processedData, chart.type]);

  const chartDescription = useMemo(() => {
    const seriesNames = chart.series.map((s) => s.label).join(", ");
    return `${chart.title} showing ${seriesNames} over time. Data values are displayed in ${currency}.`;
  }, [chart.title, chart.series, currency]);

  return (
    <figure className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <figcaption className="mb-4 text-sm font-semibold">{chart.title}</figcaption>
      <div className="h-72 w-full">
        <div
          role="img"
          aria-label={chartDescription}
          aria-describedby="chart-description"
          className="sr-only"
        >
          {chartDescription}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          {chart.type === "pie" ? (
            <PieChart aria-label={chartDescription}>
              <Pie
                data={formattedData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                aria-label={chartDescription}
              >
                {formattedData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => formatCompact(Number(v), currency)}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          ) : chart.type === "bar" ? (
            <BarChart data={formattedData} aria-label={chartDescription}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey={xKey} {...axisProps} />
              <YAxis
                {...axisProps}
                tickFormatter={(v) => formatCompact(Number(v), currency)}
                width={70}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => formatCompact(Number(v), currency)}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {chart.series.map((s) => (
                <Bar key={s.key} dataKey={s.key} stackId="a" fill={s.color} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          ) : (
            <AreaChart data={formattedData} aria-label={chartDescription}>
              <defs>
                {chart.series.map((s) => (
                  <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity={0.45} />
                    <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey={xKey} {...axisProps} minTickGap={24} />
              <YAxis
                {...axisProps}
                tickFormatter={(v) => formatCompact(Number(v), currency)}
                width={70}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => formatCompact(Number(v), currency)}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {chart.series.map((s) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  stroke={s.color}
                  fill={`url(#grad-${s.key})`}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

export const MemoizedResultChart = memo(ResultChart);
MemoizedResultChart.displayName = "MemoizedResultChart";
