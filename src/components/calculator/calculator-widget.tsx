import { useState, useCallback, useMemo } from "react";
import { Copy, Download, Printer, RotateCcw, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemoizedResultChart } from "./result-chart";
import { CURRENCIES, currencyMeta, type CurrencyCode } from "@/lib/format";
import type { CalculatorConfig, CalculatorField } from "@/lib/calculators/types";
import { track } from "@/lib/analytics";

const SUFFIXES: Record<string, string> = {
  currency: "",
  percent: "%",
  years: "yrs",
  months: "mo",
};

function getSuffix(type: string, symbol: string): string {
  if (type === "currency") return symbol;
  return SUFFIXES[type] ?? "";
}

function isIntermediateInput(raw: string): boolean {
  if (raw === "" || raw.trim() === "") return true;
  if (raw === "-" || raw === "." || raw === "+") return true;
  if (/^(-?\d*\.\d*)$/.test(raw)) return true;
  return false;
}

const validateField = Object.freeze(
  (field: CalculatorField, raw: string): { valid: boolean; error?: string; value?: number } => {
    if (raw === "" || raw.trim() === "") {
      return { valid: false, error: `Please enter ${field.label.toLowerCase()}.` };
    }

    const num = Number(raw);

    if (Number.isNaN(num)) {
      return { valid: false, error: `${field.label} must be a valid number.` };
    }

    if (!Number.isFinite(num)) {
      return { valid: false, error: `${field.label} must be a finite number.` };
    }

    if (field.min !== undefined && num < field.min) {
      if (field.type === "percent") {
        return { valid: false, error: `${field.label} must be at least ${field.min}%.` };
      }
      if (field.type === "currency" || field.type === "number") {
        return { valid: false, error: `${field.label} must be at least ${field.min}.` };
      }
      if (field.type === "years") {
        return {
          valid: false,
          error: `${field.label} must be at least ${field.min} year${field.min !== 1 ? "s" : ""}.`,
        };
      }
      if (field.type === "months") {
        return {
          valid: false,
          error: `${field.label} must be at least ${field.min} month${field.min !== 1 ? "s" : ""}.`,
        };
      }
      return { valid: false, error: `${field.label} must be at least ${field.min}.` };
    }

    if (field.max !== undefined && num > field.max) {
      if (field.type === "percent") {
        return { valid: false, error: `${field.label} must be at most ${field.max}%.` };
      }
      if (field.type === "currency" || field.type === "number") {
        return { valid: false, error: `${field.label} must be at most ${field.max}.` };
      }
      if (field.type === "years") {
        return { valid: false, error: `${field.label} must be at most ${field.max} years.` };
      }
      if (field.type === "months") {
        return { valid: false, error: `${field.label} must be at most ${field.max} months.` };
      }
      return { valid: false, error: `${field.label} must be at most ${field.max}.` };
    }

    if (field.step !== undefined && field.step > 0) {
      const remainder = Math.abs(num % field.step);
      const isOnStep = remainder < 0.0001 || Math.abs(remainder - field.step) < 0.0001;
      if (!isOnStep) {
        return { valid: false, error: `${field.label} must be in increments of ${field.step}.` };
      }
    }

    if (field.type === "currency" || field.type === "number") {
      if (!Number.isInteger(num) && num % 1 !== 0) {
        const decimals = num.toString().split(".")[1]?.length ?? 0;
        if (decimals > 2) {
          return { valid: false, error: `${field.label} must have at most 2 decimal places.` };
        }
      }
    }

    if (field.type === "percent") {
      const decimals = num.toString().split(".")[1]?.length ?? 0;
      if (decimals > 2) {
        return { valid: false, error: `${field.label} must have at most 2 decimal places.` };
      }
    }

    return { valid: true, value: num };
  },
);

interface FieldState {
  rawInput: string;
  parsedValue: number;
  touched: boolean;
  error?: string;
}

export function CalculatorWidget({ calculator }: { calculator: CalculatorConfig }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const [fields, setFields] = useState<Record<string, FieldState>>(() =>
    Object.fromEntries(
      calculator.fields.map((f) => [
        f.name,
        {
          rawInput: String(f.defaultValue),
          parsedValue: f.defaultValue,
          touched: false,
          error: undefined,
        },
      ]),
    ),
  );

  const updateRawInput = useCallback((name: string, raw: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        rawInput: raw,
      },
    }));
  }, []);

  const validateFieldOnBlur = useCallback(
    (name: string) => {
      const field = calculator.fields.find((f) => f.name === name);
      if (!field) return;

      const current = fields[name];
      const validation = validateField(field, current.rawInput);

      setFields((prev) => ({
        ...prev,
        [name]: {
          rawInput: current.rawInput,
          parsedValue: validation.valid ? validation.value! : prev[name].parsedValue,
          touched: true,
          error: validation.valid ? undefined : validation.error,
        },
      }));
    },
    [fields, calculator],
  );

  const handleInputChange = useCallback(
    (name: string, raw: string) => {
      const field = calculator.fields.find((f) => f.name === name);
      if (!field) return;

      updateRawInput(name, raw);

      if (isIntermediateInput(raw)) {
        setFields((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            error: undefined,
          },
        }));
        return;
      }

      const validation = validateField(field, raw);

      if (validation.valid) {
        setFields((prev) => ({
          ...prev,
          [name]: {
            rawInput: raw,
            parsedValue: validation.value!,
            touched: prev[name].touched,
            error: undefined,
          },
        }));
        track("calculator_calculate", { calculator: calculator.slug, field: name });
      }
    },
    [calculator, updateRawInput],
  );

  const allFieldsValid = useMemo(() => {
    return calculator.fields.every((f) => {
      const fieldState = fields[f.name];
      return fieldState.parsedValue !== undefined && fieldState.parsedValue >= (f.min ?? 0);
    });
  }, [calculator.fields, fields]);

  const result = useMemo(() => {
    if (!allFieldsValid) return null;
    try {
      const values: Record<string, number> = {};
      for (const field of calculator.fields) {
        values[field.name] = fields[field.name].parsedValue;
      }
      return calculator.compute(values, currency);
    } catch {
      return null;
    }
  }, [calculator, fields, currency, allFieldsValid]);

  const hasFieldErrors = useMemo(() => {
    return Object.values(fields).some((f) => f.error !== undefined);
  }, [fields]);

  const reset = () => {
    setFields(
      Object.fromEntries(
        calculator.fields.map((f) => [
          f.name,
          {
            rawInput: String(f.defaultValue),
            parsedValue: f.defaultValue,
            touched: false,
            error: undefined,
          },
        ]),
      ),
    );
    track("calculator_reset", { calculator: calculator.slug });
    toast.info("Inputs reset to defaults");
  };

  const symbol = currencyMeta(currency).symbol;

  return (
    <section
      aria-label={`${calculator.name} tool`}
      className="grid gap-6 rounded-3xl border border-border bg-card p-5 shadow-lift sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Your numbers</h2>
          <div className="w-32">
            <Label htmlFor="currency-select" className="sr-only">
              Currency
            </Label>
            <Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
              <SelectTrigger id="currency-select" className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.symbol} {c.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {calculator.fields.map((field) => (
            <div key={field.name}>
              <Label htmlFor={`${calculator.slug}-${field.name}`} className="text-sm">
                {field.label}
              </Label>
              {field.type === "select" ? (
                <Select
                  value={String(fields[field.name].parsedValue)}
                  onValueChange={(v) =>
                    setFields((prev) => ({
                      ...prev,
                      [field.name]: {
                        ...prev[field.name],
                        parsedValue: Number(v),
                        rawInput: v,
                      },
                    }))
                  }
                >
                  <SelectTrigger
                    id={`${calculator.slug}-${field.name}`}
                    className="mt-1.5 h-11 rounded-xl"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((o) => (
                      <SelectItem key={o.value} value={String(o.value)}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="relative mt-1.5">
                  <Input
                    id={`${calculator.slug}-${field.name}`}
                    type="number"
                    inputMode="decimal"
                    value={fields[field.name].rawInput}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    onBlur={() => validateFieldOnBlur(field.name)}
                    onKeyDown={(e) => {
                      if (e.key === " " && field.type === "select") {
                        e.preventDefault();
                      }
                    }}
                    min={field.min}
                    max={field.max}
                    step={field.step ?? 1}
                    aria-invalid={Boolean(fields[field.name].error)}
                    aria-describedby={`${field.name}-error`}
                    className={`h-11 rounded-xl pr-14 ${fields[field.name].error ? "border-destructive" : ""}`}
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {getSuffix(field.type, symbol)}
                  </span>
                </div>
              )}
              {fields[field.name].touched && fields[field.name].error && (
                <p
                  id={`${field.name}-error`}
                  className="mt-1 text-xs text-destructive"
                  role="alert"
                  aria-live="polite"
                >
                  {fields[field.name].error}
                </p>
              )}
              {field.help && <p className="mt-1 text-xs text-muted-foreground">{field.help}</p>}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={copyResult}
            disabled={!result || hasFieldErrors}
          >
            <Copy className="size-4" aria-hidden="true" />
            <span className="sr-only">Copy</span>
            Copy
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={shareResult}
            disabled={!result || hasFieldErrors}
          >
            <Share2 className="size-4" aria-hidden="true" />
            <span className="sr-only">Share</span>
            Share
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={download}
            disabled={!result || hasFieldErrors}
          >
            <Download className="size-4" aria-hidden="true" />
            <span className="sr-only">Download</span>
            Download
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={print}
            disabled={!result || hasFieldErrors}
          >
            <Printer className="size-4" aria-hidden="true" />
            <span className="sr-only">Print</span>
            Print / PDF
          </Button>
          <Button variant="ghost" className="rounded-xl" onClick={reset}>
            <RotateCcw className="size-4" aria-hidden="true" />
            <span className="sr-only">Reset</span>
            Reset
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        {result ? (
          <>
            <div aria-live="polite" className="rounded-2xl bg-surface p-5">
              <p className="text-sm text-muted-foreground">{result.summary}</p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {result.metrics.map((m) => (
                  <div
                    key={m.label}
                    className={
                      m.emphasis
                        ? "rounded-xl bg-primary p-4 text-primary-foreground sm:col-span-2"
                        : "rounded-xl border border-border bg-card p-4"
                    }
                  >
                    <dt
                      className={
                        m.emphasis
                          ? "text-xs uppercase tracking-wide opacity-90"
                          : "text-xs uppercase tracking-wide text-muted-foreground"
                      }
                    >
                      {m.label}
                    </dt>
                    <dd
                      className={
                        m.emphasis ? "mt-1 text-3xl font-bold" : "mt-1 text-xl font-semibold"
                      }
                    >
                      {m.value}
                    </dd>
                    {m.hint && (
                      <p
                        className={
                          m.emphasis
                            ? "mt-1 text-xs opacity-90"
                            : "mt-1 text-xs text-muted-foreground"
                        }
                      >
                        {m.hint}
                      </p>
                    )}
                  </div>
                ))}
              </dl>
            </div>
            {result.chart && <MemoizedResultChart chart={result.chart} currency={currency} />}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold">Step-by-step calculation</h3>
              <ol className="mt-3 space-y-3">
                {result.steps.map((s, i) => (
                  <li key={s.label} className="flex gap-3 text-sm">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                      {i + 1}
                    </span>
                    <span>
                      <span className="font-medium">{s.label}</span>
                      <span className="block text-muted-foreground">{s.expression}</span>
                    </span>
                    <span className="ml-auto font-semibold">{s.result}</span>
                  </li>
                ))}
              </ol>
            </div>
            {result.table && (
              <div className="overflow-x-auto rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold">Schedule snapshot</h3>
                <table className="mt-3 w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                      {result.table.columns.map((c) => (
                        <th key={c} scope="col" className="py-2 pr-4 font-medium">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.table.rows.map((row) => (
                      <tr key={row.join("-")} className="border-t border-border">
                        {row.map((cell, ci) => (
                          <td key={ci} className="py-2 pr-4">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <p className="rounded-2xl border border-destructive/40 bg-surface p-5 text-sm text-destructive">
            {hasFieldErrors
              ? "Please correct the highlighted fields to calculate results."
              : "Enter your numbers to see the calculation results."}
          </p>
        )}
      </div>
    </section>
  );

  function copyResult() {
    if (!result) return;
    const lines = [
      `${calculator.name} — MoneyCalc`,
      "",
      "Inputs:",
      ...calculator.fields.map((f) => `- ${f.label}: ${fields[f.name].parsedValue}`),
      "",
      "Results:",
      ...result.metrics.map((m) => `- ${m.label}: ${m.value}`),
      "",
      result.summary,
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      track("result_copy", { calculator: calculator.slug });
      toast.success("Result copied to clipboard");
    });
  }

  function shareResult() {
    if (!result) return;
    track("result_share", { calculator: calculator.slug });
    const shareData = {
      title: `${calculator.name} — MoneyCalc`,
      text: result.summary,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        navigator.share(shareData);
        return;
      } catch {
        /* user dismissed */
      }
    }
    navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`).then(() => {
      toast.success("Share link copied");
    });
  }

  function download() {
    if (!result) return;
    const lines = [
      `${calculator.name} — MoneyCalc`,
      "",
      "Inputs:",
      ...calculator.fields.map((f) => `- ${f.label}: ${fields[f.name].parsedValue}`),
      "",
      "Results:",
      ...result.metrics.map((m) => `- ${m.label}: ${m.value}`),
      "",
      result.summary,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${calculator.slug}-result.txt`;
    a.click();
    URL.revokeObjectURL(url);
    track("result_download", { calculator: calculator.slug });
  }

  function print() {
    if (!result) return;
    track("result_print", { calculator: calculator.slug });
    window.print();
  }
}
