import { formatCurrency, formatNumber, formatPercent } from "@/lib/format";
import type { CalculatorConfig } from "../types";

interface GrowthRow {
  year: number;
  balance: number;
  contributed: number;
  interest: number;
}

function growthSchedule(
  initial: number,
  monthly: number,
  annualRatePct: number,
  years: number,
  periodsPerYear = 12,
) {
  const rows: GrowthRow[] = [{ year: 0, balance: initial, contributed: initial, interest: 0 }];
  const r = annualRatePct / 100 / periodsPerYear;
  const monthlyToPeriod = (monthly * 12) / periodsPerYear;
  let balance = initial;
  let contributed = initial;
  const total = Math.round(years * periodsPerYear);
  for (let i = 1; i <= total; i += 1) {
    balance = balance * (1 + r) + monthlyToPeriod;
    contributed += monthlyToPeriod;
    if (i % periodsPerYear === 0 || i === total) {
      rows.push({
        year: Math.ceil(i / periodsPerYear),
        balance,
        contributed,
        interest: balance - contributed,
      });
    }
  }
  return rows;
}

export const investingCalculators: CalculatorConfig[] = [
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    shortName: "Compound Interest",
    title: "Compound Interest Calculator — Growth With Contributions",
    description:
      "Calculate how compound interest grows your money over time with regular contributions, adjustable compounding frequency and a year-by-year growth chart.",
    keywords: [
      "compound interest calculator",
      "compounding",
      "interest growth",
      "investment growth",
    ],
    category: "Investments",
    icon: "LineChart",
    popular: true,
    fields: [
      {
        name: "principal",
        label: "Initial deposit",
        type: "currency",
        defaultValue: 10000,
        min: 0,
        step: 500,
      },
      {
        name: "monthly",
        label: "Monthly contribution",
        type: "currency",
        defaultValue: 500,
        min: 0,
        step: 50,
      },
      {
        name: "rate",
        label: "Annual interest rate",
        type: "percent",
        defaultValue: 8,
        min: 0,
        max: 40,
        step: 0.1,
      },
      {
        name: "years",
        label: "Time horizon",
        type: "years",
        defaultValue: 20,
        min: 1,
        max: 60,
        step: 1,
      },
      {
        name: "frequency",
        label: "Compounding frequency",
        type: "select",
        defaultValue: 12,
        options: [
          { label: "Annually", value: 1 },
          { label: "Semi-annually", value: 2 },
          { label: "Quarterly", value: 4 },
          { label: "Monthly", value: 12 },
          { label: "Daily", value: 365 },
        ],
      },
    ],
    compute: ({ principal, monthly, rate, years, frequency }, currency) => {
      const rows = growthSchedule(principal, monthly, rate, years, frequency);
      const last = rows[rows.length - 1];
      const interest = last.balance - last.contributed;
      return {
        summary: `${formatCurrency(principal, currency, 0)} plus ${formatCurrency(monthly, currency, 0)} a month grows to ${formatCurrency(last.balance, currency, 0)} in ${years} years.`,
        metrics: [
          {
            label: "Future balance",
            value: formatCurrency(last.balance, currency, 0),
            emphasis: true,
          },
          { label: "Total contributed", value: formatCurrency(last.contributed, currency, 0) },
          { label: "Interest earned", value: formatCurrency(interest, currency, 0) },
          {
            label: "Growth multiple",
            value: `${formatNumber(last.balance / Math.max(last.contributed, 1), 2)}×`,
            hint: "Balance divided by what you put in",
          },
        ],
        chart: {
          type: "area",
          title: "Contributions vs interest",
          xKey: "year",
          data: rows.map((r) => ({
            year: `Yr ${r.year}`,
            Contributed: Math.round(r.contributed),
            Interest: Math.round(Math.max(r.interest, 0)),
          })),
          series: [
            { key: "Contributed", label: "Contributed", color: "var(--color-chart-1)" },
            { key: "Interest", label: "Interest", color: "var(--color-chart-2)" },
          ],
        },
        steps: [
          {
            label: "Periodic rate",
            expression: `${rate}% ÷ ${frequency}`,
            result: formatPercent(rate / frequency, 4),
          },
          {
            label: "Number of periods",
            expression: `${years} × ${frequency}`,
            result: `${Math.round(years * frequency)}`,
          },
          {
            label: "Lump sum growth",
            expression: "P × (1 + r/n)^(n·t)",
            result: formatCurrency(
              principal * Math.pow(1 + rate / 100 / frequency, frequency * years),
              currency,
              0,
            ),
          },
          {
            label: "Plus contributions",
            expression: "PMT × [((1 + r/n)^(n·t) − 1) ÷ (r/n)]",
            result: formatCurrency(last.balance, currency, 0),
          },
        ],
      };
    },
    content: {
      intro:
        "Compound interest is the reason a modest monthly habit becomes a serious sum given enough time. Each period, interest is earned on the money you added and on all the interest that came before it.",
      what: "This compound interest calculator projects the future value of an initial deposit plus recurring contributions at a chosen rate and compounding frequency, separating what you contributed from what the growth added.",
      how: [
        "Enter your starting balance and the amount you add each month.",
        "Set a realistic annual return — long-run equity averages sit near 7–10% before inflation.",
        "Pick a time horizon; the effect of compounding accelerates sharply after year 15.",
        "Choose the compounding frequency your account actually uses.",
      ],
      formula: "A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) ÷ (r/n)]",
      formulaNote:
        "P is the principal, r the annual rate, n the compounding periods per year, t the years and PMT the contribution per period.",
      example:
        "Starting with 10,000 and adding 500 a month at 8% for 20 years produces roughly 343,000. Only about 130,000 of that is money you contributed — the rest is compounding at work.",
      advantages: [
        "Shows the split between your contributions and pure growth.",
        "Demonstrates how starting earlier beats contributing more later.",
        "Supports any compounding frequency, from annual to daily.",
      ],
      limitations: [
        "Assumes a constant rate; real markets swing year to year.",
        "Fees, taxes and inflation are not deducted.",
        "Contributions are assumed to be perfectly regular.",
      ],
      howWorks:
        "The calculator uses the compound interest formula with regular contributions. The first term P(1 + r/n)^(nt) calculates how the initial deposit grows with compound interest. The second term PMT × [((1 + r/n)^(nt) − 1) ÷ (r/n)] calculates how regular contributions grow, assuming each contribution earns interest from the time it's made until the end of the period.",
      assumptions: [
        "Interest compounds at the selected frequency (annually, monthly, daily, etc.).",
        "The annual interest rate remains constant throughout the investment period.",
        "Monthly contributions are made at the end of each period.",
        "No additional deposits, withdrawals, or irregular contributions are made.",
        "No taxes are applied to the returns (tax-sheltered accounts).",
        "No fees (management, trading, or other) are deducted from the returns.",
        "Inflation is not factored into the final balance.",
      ],
      commonMistakes: [
        "Using the annual rate instead of the periodic rate when compounding frequency differs from annually.",
        "Forgetting to adjust for compounding frequency — daily compounding yields more than annual compounding at the same rate.",
        "Using the wrong formula for regular contributions (treating them like a lump sum).",
        "Not accounting for the timing of contributions — beginning vs. end of period affects results.",
        "Using an unrealistically high return rate that doesn't reflect long-term averages.",
        "Ignoring the impact of inflation on the real value of the final amount.",
        "Assuming contributions don't earn interest — they compound from day one.",
        "Comparing results from different calculators with different compounding assumptions.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Compound interest formula with regular contributions",
        version: "1.0.0",
      },
    },
    faqs: [
      {
        question: "What is compound interest?",
        answer:
          "Compound interest is interest calculated on the original principal plus all previously accumulated interest, which is why balances curve upward rather than rising in a straight line.",
      },
      {
        question: "How often should interest compound?",
        answer:
          "More frequent compounding produces slightly more growth. The jump from annual to monthly matters most; monthly to daily adds very little.",
      },
      {
        question: "What is the rule of 72?",
        answer:
          "Divide 72 by the annual return to estimate the years needed to double your money. At 8%, that is roughly nine years.",
      },
      {
        question: "Does inflation affect these results?",
        answer:
          "Yes. To see purchasing power rather than nominal balance, subtract your inflation assumption from the return, or use the inflation calculator alongside this one.",
      },
    ],
    related: ["investment-calculator", "savings-calculator", "retirement-calculator"],
  },
  {
    slug: "investment-calculator",
    name: "Investment Calculator",
    shortName: "Investment",
    title: "Investment Calculator — Portfolio Growth After Inflation",
    description:
      "Project portfolio value over time with regular investing, and see both the nominal balance and the inflation-adjusted purchasing power.",
    keywords: ["investment calculator", "portfolio growth", "sip calculator", "real return"],
    category: "Investments",
    icon: "TrendingUp",
    popular: true,
    fields: [
      {
        name: "initial",
        label: "Initial investment",
        type: "currency",
        defaultValue: 20000,
        min: 0,
        step: 1000,
      },
      {
        name: "monthly",
        label: "Monthly investment",
        type: "currency",
        defaultValue: 750,
        min: 0,
        step: 50,
      },
      {
        name: "rate",
        label: "Expected annual return",
        type: "percent",
        defaultValue: 9,
        min: -20,
        max: 40,
        step: 0.1,
      },
      {
        name: "years",
        label: "Investment period",
        type: "years",
        defaultValue: 25,
        min: 1,
        max: 60,
        step: 1,
      },
      {
        name: "inflation",
        label: "Inflation rate",
        type: "percent",
        defaultValue: 2.5,
        min: 0,
        max: 20,
        step: 0.1,
      },
      {
        name: "fees",
        label: "Annual fees",
        type: "percent",
        defaultValue: 0.3,
        min: 0,
        max: 5,
        step: 0.05,
      },
    ],
    compute: ({ initial, monthly, rate, years, inflation, fees }, currency) => {
      const netRate = rate - fees;
      const rows = growthSchedule(initial, monthly, netRate, years);
      const last = rows[rows.length - 1];
      const real = last.balance / Math.pow(1 + inflation / 100, years);
      const noFees = growthSchedule(initial, monthly, rate, years);
      const feeCost = noFees[noFees.length - 1].balance - last.balance;
      return {
        summary: `Investing ${formatCurrency(monthly, currency, 0)} a month for ${years} years at ${formatPercent(rate, 1)} builds ${formatCurrency(last.balance, currency, 0)} — about ${formatCurrency(real, currency, 0)} in today's money.`,
        metrics: [
          {
            label: "Portfolio value",
            value: formatCurrency(last.balance, currency, 0),
            emphasis: true,
          },
          { label: "Inflation-adjusted value", value: formatCurrency(real, currency, 0) },
          { label: "Total invested", value: formatCurrency(last.contributed, currency, 0) },
          {
            label: "Investment gains",
            value: formatCurrency(last.balance - last.contributed, currency, 0),
          },
          {
            label: "Portfolio value lost to fees",
            value: formatCurrency(feeCost, currency, 0),
            hint: `At ${formatPercent(fees, 2)} per year, your final portfolio is ${formatPercent((feeCost / noFees[noFees.length - 1].balance) * 100, 1)} smaller than it would have been without fees`,
          },
        ],
        chart: {
          type: "area",
          title: "Nominal vs real portfolio value",
          xKey: "year",
          data: rows.map((r) => ({
            year: `Yr ${r.year}`,
            Nominal: Math.round(r.balance),
            Real: Math.round(r.balance / Math.pow(1 + inflation / 100, r.year)),
          })),
          series: [
            { key: "Nominal", label: "Nominal", color: "var(--color-chart-1)" },
            { key: "Real", label: "Today's money", color: "var(--color-chart-2)" },
          ],
        },
        steps: [
          {
            label: "Net return after fees",
            expression: `${rate}% − ${fees}%`,
            result: formatPercent(netRate, 2),
          },
          {
            label: "Monthly rate",
            expression: `${netRate.toFixed(2)}% ÷ 12`,
            result: formatPercent(netRate / 12, 4),
          },
          {
            label: "Future value",
            expression: "P(1 + r)ⁿ + PMT × [((1 + r)ⁿ − 1) ÷ r]",
            result: formatCurrency(last.balance, currency, 0),
          },
          {
            label: "Discount for inflation",
            expression: `FV ÷ (1 + ${inflation}%)^${years}`,
            result: formatCurrency(real, currency, 0),
          },
        ],
      };
    },
    content: {
      intro:
        "Two portfolios with the same headline return can leave you in very different places once fees and inflation are taken out. This calculator projects both the nominal balance and what it will actually buy.",
      what: "An investment calculator projects the growth of a portfolio funded by an initial lump sum and recurring monthly contributions, then discounts the result for inflation and subtracts ongoing fund fees.",
      how: [
        "Enter your starting portfolio value and monthly contribution.",
        "Set an expected annual return based on your asset allocation.",
        "Add your blended fund expense ratio — even 0.5% compounds into real money.",
        "Set an inflation assumption to see the balance in today's purchasing power.",
      ],
      formula: "FV = P(1 + rₙ)ᴺ + PMT × [((1 + rₙ)ᴺ − 1) ÷ rₙ],  Real = FV ÷ (1 + i)ᵗ",
      formulaNote:
        "rₙ is the monthly net return after fees, N the number of months, i the annual inflation rate and t the years.",
      example:
        "Investing 20,000 plus 750 a month for 25 years at 9% with 0.3% fees grows to roughly 855,000 nominally, but closer to 460,000 in today's money after 2.5% inflation.",
      advantages: [
        "Separates nominal growth from real purchasing power.",
        "Quantifies the lifetime drag of fund fees.",
        "Useful for testing SIP-style monthly investing plans.",
      ],
      limitations: [
        "Assumes a smooth annual return with no sequence-of-returns risk.",
        "Capital gains and dividend taxes are excluded.",
        "Does not model rebalancing or changing asset allocation over time.",
      ],
      howWorks:
        "The calculator first computes the net return by subtracting fees from the expected return. It then projects the portfolio growth using the compound interest formula with monthly contributions. Separately, it calculates what the portfolio would be worth without fees to show the fee cost. Finally, it discounts the nominal value by the inflation rate to show the real purchasing power.",
      assumptions: [
        "The expected annual return is constant throughout the investment period.",
        "Fund fees (expense ratio) are deducted annually from the return.",
        "Monthly contributions are made at the end of each month.",
        "Inflation is constant at the specified rate.",
        "No taxes (capital gains, dividends, or interest) are applied.",
        "No additional deposits or withdrawals occur during the period.",
        "Compounding occurs monthly.",
        "The portfolio is fully invested with no cash drag.",
      ],
      commonMistakes: [
        "Using the gross return instead of the net return after fees.",
        "Forgetting that fees compound over time and have a multiplicative effect.",
        "Not accounting for inflation when interpreting the final number.",
        "Using an unrealistically high return rate that doesn't reflect long-term averages.",
        "Ignoring the difference between nominal and real returns.",
        "Assuming that past performance will continue at the same rate.",
        "Not understanding that even small differences in fees compound significantly over decades.",
        "Using annual returns with monthly compounding without adjusting the rate.",
        "Forgetting that contributions also earn returns from the time they're made.",
        "Comparing returns without considering tax implications.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Compound interest with net return, fees, and inflation adjustment",
        version: "1.0.0",
      },
    },
    faqs: [
      {
        question: "What return should I assume?",
        answer:
          "Broad equity indices have historically returned about 7–10% a year before inflation over long periods. Balanced portfolios sit lower. Conservative assumptions age better than optimistic ones.",
      },
      {
        question: "How much do fund fees really cost?",
        answer:
          "A 1% annual fee can consume a fifth of a portfolio's final value over 25 years. Low-cost index funds are the simplest way to keep that money.",
      },
      {
        question: "Is lump sum or monthly investing better?",
        answer:
          "Historically lump-sum investing wins more often because markets rise most of the time, but monthly investing reduces regret risk and matches how most people earn.",
      },
      {
        question: "What is a real return?",
        answer:
          "The real return is the nominal return minus inflation. It tells you whether your wealth is actually growing in purchasing power.",
      },
    ],
    related: ["compound-interest-calculator", "retirement-calculator", "inflation-calculator"],
  },
  {
    slug: "savings-calculator",
    name: "Savings Calculator",
    shortName: "Savings",
    title: "Savings Calculator — Reach Your Goal Faster",
    description:
      "Work out how much your savings will be worth, how long a goal will take, and how much interest a high-yield account adds along the way.",
    keywords: ["savings calculator", "savings goal", "high yield savings", "APY calculator"],
    category: "Savings",
    icon: "PiggyBank",
    popular: true,
    fields: [
      {
        name: "initial",
        label: "Current savings",
        type: "currency",
        defaultValue: 5000,
        min: 0,
        step: 250,
      },
      {
        name: "monthly",
        label: "Monthly deposit",
        type: "currency",
        defaultValue: 400,
        min: 0,
        step: 25,
      },
      {
        name: "apy",
        label: "Annual percentage yield",
        type: "percent",
        defaultValue: 4.2,
        min: 0,
        max: 20,
        step: 0.05,
      },
      {
        name: "years",
        label: "Saving period",
        type: "years",
        defaultValue: 5,
        min: 1,
        max: 40,
        step: 1,
      },
      {
        name: "goal",
        label: "Savings goal",
        type: "currency",
        defaultValue: 40000,
        min: 0,
        step: 1000,
      },
    ],
    compute: ({ initial, monthly, apy, years, goal }, currency) => {
      const rows = growthSchedule(initial, monthly, apy, years);
      const last = rows[rows.length - 1];
      const r = apy / 100 / 12;
      let bal = initial;
      let monthsToGoal = 0;
      while (bal < goal && monthsToGoal < 1200) {
        bal = bal * (1 + r) + monthly;
        monthsToGoal += 1;
      }
      const reached = bal >= goal;
      return {
        summary: `Saving ${formatCurrency(monthly, currency, 0)} a month at ${formatPercent(apy, 2)} APY grows to ${formatCurrency(last.balance, currency, 0)} in ${years} years.`,
        metrics: [
          {
            label: "Balance after period",
            value: formatCurrency(last.balance, currency, 0),
            emphasis: true,
          },
          {
            label: "Interest earned",
            value: formatCurrency(last.balance - last.contributed, currency, 0),
          },
          { label: "Total deposited", value: formatCurrency(last.contributed, currency, 0) },
          {
            label: "Time to reach goal",
            value: reached
              ? `${Math.floor(monthsToGoal / 12)} yr ${monthsToGoal % 12} mo`
              : "Beyond 100 years",
            hint: `Goal: ${formatCurrency(goal, currency, 0)}`,
          },
          {
            label: "Goal progress",
            value: formatPercent(Math.min((last.balance / Math.max(goal, 1)) * 100, 999), 0),
          },
        ],
        chart: {
          type: "bar",
          title: "Savings balance by year",
          xKey: "year",
          data: rows.map((r2) => ({
            year: `Yr ${r2.year}`,
            Deposits: Math.round(r2.contributed),
            Interest: Math.round(Math.max(r2.interest, 0)),
          })),
          series: [
            { key: "Deposits", label: "Deposits", color: "var(--color-chart-1)" },
            { key: "Interest", label: "Interest", color: "var(--color-chart-2)" },
          ],
        },
        steps: [
          {
            label: "Monthly yield",
            expression: `${apy}% ÷ 12`,
            result: formatPercent(apy / 12, 4),
          },
          { label: "Months saved", expression: `${years} × 12`, result: `${years * 12}` },
          {
            label: "Future value",
            expression: "P(1 + r)ⁿ + PMT × [((1 + r)ⁿ − 1) ÷ r]",
            result: formatCurrency(last.balance, currency, 0),
          },
          {
            label: "Interest component",
            expression: "balance − deposits",
            result: formatCurrency(last.balance - last.contributed, currency, 0),
          },
        ],
      };
    },
    content: {
      intro:
        "Savings accounts are where your emergency fund and short-term goals live. The difference between a 0.4% legacy account and a 4.2% high-yield account is thousands of units of free money over a few years.",
      what: "This savings calculator projects the future balance of a savings account funded by an opening balance plus regular monthly deposits, and estimates how long a specific savings goal will take.",
      how: [
        "Enter what you already have saved and what you can add each month.",
        "Use the APY quoted by the account, which already includes compounding.",
        "Set a saving period and a target goal amount.",
        "Compare accounts by changing only the APY to isolate its effect.",
      ],
      formula: "FV = P(1 + r)ⁿ + PMT × [((1 + r)ⁿ − 1) ÷ r]",
      formulaNote: "r is the monthly yield (APY ÷ 12) and n the number of monthly deposits.",
      example:
        "Starting with 5,000 and saving 400 a month at 4.2% APY reaches roughly 32,700 after five years, of which about 3,700 is interest rather than deposits.",
      advantages: [
        "Makes short-term goals like a house deposit concrete and datable.",
        "Shows how much of the balance is interest versus your own money.",
        "Great for comparing high-yield accounts against your current bank.",
      ],
      limitations: [
        "Assumes the APY stays fixed; savings rates move with central bank policy.",
        "Interest may be taxable depending on your jurisdiction and account type.",
        "Does not account for withdrawals or missed deposits.",
      ],
      howWorks:
        "The calculator uses the future value formula for compound interest with regular contributions. The APY (Annual Percentage Yield) already factors in compounding, so we convert it to a monthly rate by dividing by 12. Each monthly deposit is assumed to earn interest for the remaining months until the end of the period.",
      assumptions: [
        "The APY (Annual Percentage Yield) remains constant throughout the term.",
        "Interest compounds monthly (as is standard for savings accounts).",
        "Monthly deposits are made at regular intervals and earn interest from deposit date.",
        "No additional deposits, withdrawals, or missed payments occur.",
        "Interest is taxable unless in a tax-sheltered account.",
        "The account has no withdrawal penalties or minimum balance requirements.",
        "No direct deposit bonuses or promotional rates are applied.",
      ],
      commonMistakes: [
        "Using the nominal interest rate instead of the APY, which doesn't account for compounding.",
        "Forgetting that APY already includes compounding, so don't compound it again manually.",
        "Not accounting for taxes on interest earnings.",
        "Assuming savings rates are fixed when they can change with central bank policy.",
        "Using annual compounding assumptions instead of monthly compounding.",
        "Not understanding that early deposits earn more interest than late-period deposits.",
        "Comparing accounts with different compounding frequencies without adjusting.",
        "Forgetting that FDIC insurance has limits (typically $250,000 per institution).",
        "Using an interest rate that's too high based on past performance rather than current rates.",
        "Not considering that inflation erodes the real value of savings over time.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Compound interest formula with monthly contributions using APY",
        version: "1.0.0",
      },
    },
    faqs: [
      {
        question: "What is APY?",
        answer:
          "Annual percentage yield is the effective annual return after compounding is applied, which makes it the fairest way to compare savings accounts.",
      },
      {
        question: "How big should my emergency fund be?",
        answer:
          "Three to six months of essential expenses is the usual guidance, held in an instant-access account rather than invested.",
      },
      {
        question: "Should I save or invest?",
        answer:
          "Money needed within roughly three years belongs in savings. Longer horizons can tolerate market volatility in exchange for higher expected returns.",
      },
      {
        question: "Is savings interest taxed?",
        answer:
          "In most countries interest counts as taxable income unless it sits in a tax-sheltered account. Check the rules that apply where you live.",
      },
    ],
    related: ["compound-interest-calculator", "investment-calculator", "inflation-calculator"],
  },
  {
    slug: "retirement-calculator",
    name: "Retirement Calculator",
    shortName: "Retirement",
    title: "Retirement Calculator — Nest Egg and Retirement Income",
    description:
      "Estimate your retirement nest egg, the income it can safely support, and whether your current savings rate is on track for the retirement you want.",
    keywords: [
      "retirement calculator",
      "401k calculator",
      "retirement savings",
      "safe withdrawal rate",
    ],
    category: "Retirement",
    icon: "Sunrise",
    popular: true,
    fields: [
      {
        name: "age",
        label: "Current age",
        type: "number",
        defaultValue: 32,
        min: 16,
        max: 80,
        step: 1,
      },
      {
        name: "retireAge",
        label: "Retirement age",
        type: "number",
        defaultValue: 65,
        min: 40,
        max: 90,
        step: 1,
      },
      {
        name: "current",
        label: "Current retirement savings",
        type: "currency",
        defaultValue: 45000,
        min: 0,
        step: 1000,
      },
      {
        name: "monthly",
        label: "Monthly contribution",
        type: "currency",
        defaultValue: 900,
        min: 0,
        step: 50,
      },
      {
        name: "rate",
        label: "Expected annual return",
        type: "percent",
        defaultValue: 7.5,
        min: 0,
        max: 20,
        step: 0.1,
      },
      {
        name: "withdrawal",
        label: "Safe withdrawal rate",
        type: "percent",
        defaultValue: 4,
        min: 1,
        max: 10,
        step: 0.1,
      },
      {
        name: "inflation",
        label: "Inflation rate",
        type: "percent",
        defaultValue: 2.5,
        min: 0,
        max: 15,
        step: 0.1,
      },
    ],
    compute: ({ age, retireAge, current, monthly, rate, withdrawal, inflation }, currency) => {
      const years = Math.max(retireAge - age, 0);
      const rows = growthSchedule(current, monthly, rate, years);
      const last = rows[rows.length - 1];
      const annualIncome = last.balance * (withdrawal / 100);
      const realIncome = annualIncome / Math.pow(1 + inflation / 100, years);
      return {
        summary: `Retiring at ${retireAge} with ${formatCurrency(last.balance, currency, 0)} supports about ${formatCurrency(annualIncome / 12, currency, 0)} of monthly income at a ${formatPercent(withdrawal, 1)} withdrawal rate.`,
        metrics: [
          {
            label: "Nest egg at retirement",
            value: formatCurrency(last.balance, currency, 0),
            emphasis: true,
          },
          { label: "Annual retirement income", value: formatCurrency(annualIncome, currency, 0) },
          {
            label: "Monthly retirement income",
            value: formatCurrency(annualIncome / 12, currency, 0),
          },
          {
            label: "Income in today's money",
            value: formatCurrency(realIncome / 12, currency, 0),
            hint: "Monthly, inflation adjusted",
          },
          { label: "Years of contributions", value: `${years}` },
          { label: "Total contributed", value: formatCurrency(last.contributed, currency, 0) },
        ],
        chart: {
          type: "area",
          title: "Projected retirement savings",
          xKey: "year",
          data: rows.map((r) => ({
            year: `Age ${age + r.year}`,
            Balance: Math.round(r.balance),
            Contributions: Math.round(r.contributed),
          })),
          series: [
            { key: "Balance", label: "Balance", color: "var(--color-chart-1)" },
            { key: "Contributions", label: "Contributions", color: "var(--color-chart-3)" },
          ],
        },
        steps: [
          { label: "Years to retirement", expression: `${retireAge} − ${age}`, result: `${years}` },
          {
            label: "Monthly return",
            expression: `${rate}% ÷ 12`,
            result: formatPercent(rate / 12, 4),
          },
          {
            label: "Projected nest egg",
            expression: "P(1 + r)ⁿ + PMT × [((1 + r)ⁿ − 1) ÷ r]",
            result: formatCurrency(last.balance, currency, 0),
          },
          {
            label: "Sustainable income",
            expression: `nest egg × ${withdrawal}%`,
            result: formatCurrency(annualIncome, currency, 0),
          },
        ],
      };
    },
    content: {
      intro:
        "Retirement planning comes down to two numbers: the pot you accumulate and the income it can safely produce. A few percentage points of savings rate today changes both dramatically.",
      what: "A retirement calculator projects your retirement savings from today until your target retirement age, then applies a safe withdrawal rate to estimate the sustainable income that balance can generate.",
      how: [
        "Enter your current age, target retirement age and existing retirement savings.",
        "Add your total monthly contribution, including any employer match.",
        "Choose a long-run expected return for your allocation.",
        "Set a withdrawal rate — 4% is the classic starting point — and an inflation assumption.",
      ],
      formula: "Nest egg = P(1 + r)ⁿ + PMT × [((1 + r)ⁿ − 1) ÷ r];  Income = nest egg × w",
      formulaNote:
        "r is the monthly return, n the months until retirement and w the annual safe withdrawal rate.",
      example:
        "A 32-year-old with 45,000 saved who contributes 900 a month at 7.5% reaches roughly 1.7 million by 65. At a 4% withdrawal rate that funds around 5,700 a month before inflation.",
      advantages: [
        "Connects today's savings rate to tomorrow's monthly income.",
        "Includes an inflation-adjusted view so the number feels real.",
        "Makes the cost of delaying contributions painfully clear.",
      ],
      limitations: [
        "Ignores state pensions, social security and other income sources.",
        "Uses a flat return rather than modelling market sequence risk.",
        "Tax treatment of withdrawals varies widely by account and country.",
      ],
      howWorks:
        "The calculator first determines the number of months until retirement (months between current age and retirement age). It then projects the growth of your current savings plus monthly contributions using the compound interest formula. Finally, it applies the safe withdrawal rate to estimate the annual income the nest egg can sustain. It also calculates the inflation-adjusted value to show what that income will actually buy in today's dollars.",
      assumptions: [
        "The expected annual return is constant throughout the accumulation period.",
        "Monthly contributions are made consistently without interruption.",
        "The safe withdrawal rate remains constant at the chosen percentage.",
        "Inflation rates remain constant until retirement and beyond.",
        "No taxes are applied to the growth or withdrawals (tax-sheltered accounts).",
        "No changes in contribution amounts due to salary increases.",
        "No early withdrawals or penalty distributions before retirement.",
        "Employer matching contributions are included in monthly contributions.",
        "No required minimum distributions (RMDs) are considered.",
      ],
      commonMistakes: [
        "Using an unrealistically high return rate based on recent bull markets.",
        "Starting too late and expecting to catch up through higher contributions alone.",
        "Not including employer matching in the contribution calculation.",
        "Using a withdrawal rate higher than 4% without considering sequence risk.",
        "Forgetting that inflation erodes purchasing power over 20-40 year retirement periods.",
        "Not accounting for required minimum distributions (RMDs) from traditional accounts.",
        "Assuming Social Security or pension income without adding it to the calculation.",
        "Not considering health care costs which typically rise faster than general inflation.",
        "Using a single flat return assumption instead of considering market volatility.",
        "Not adjusting contributions for salary increases or career changes.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Compound interest projection with safe withdrawal rate analysis",
        version: "1.0.0",
      },
    },
    faqs: [
      {
        question: "How much do I need to retire?",
        answer:
          "A common rule of thumb is 25 times your desired annual spending, which corresponds to a 4% withdrawal rate.",
      },
      {
        question: "What is the 4% rule?",
        answer:
          "It suggests withdrawing 4% of your portfolio in the first year of retirement and adjusting for inflation thereafter, which historically lasted 30 years in most scenarios.",
      },
      {
        question: "How much should I contribute each month?",
        answer:
          "Aiming for 15% of gross income, including any employer match, is a widely used benchmark for someone starting in their twenties or early thirties.",
      },
      {
        question: "Is it too late to start at 45?",
        answer:
          "No. Twenty years of compounding is still powerful, though you will need a higher contribution rate and may want to delay retirement slightly.",
      },
    ],
    related: ["investment-calculator", "compound-interest-calculator", "inflation-calculator"],
  },
  {
    slug: "inflation-calculator",
    name: "Inflation Calculator",
    shortName: "Inflation",
    title: "Inflation Calculator — Future Value of Money",
    description:
      "See what an amount of money will be worth in the future after inflation, and how much you would need then to match today's purchasing power.",
    keywords: [
      "inflation calculator",
      "purchasing power",
      "cost of living",
      "future value of money",
    ],
    category: "Personal Finance",
    icon: "Flame",
    fields: [
      {
        name: "amount",
        label: "Amount today",
        type: "currency",
        defaultValue: 50000,
        min: 1,
        step: 1000,
      },
      {
        name: "rate",
        label: "Average inflation rate",
        type: "percent",
        defaultValue: 3,
        min: 0,
        max: 30,
        step: 0.1,
      },
      {
        name: "years",
        label: "Number of years",
        type: "years",
        defaultValue: 20,
        min: 1,
        max: 60,
        step: 1,
      },
    ],
    compute: ({ amount, rate, years }, currency) => {
      const factor = Math.pow(1 + rate / 100, years);
      const needed = amount * factor;
      const worth = amount / factor;
      const data = Array.from({ length: years + 1 }, (_, y) => ({
        year: `Yr ${y}`,
        "Purchasing power": Math.round(amount / Math.pow(1 + rate / 100, y)),
        "Equivalent cost": Math.round(amount * Math.pow(1 + rate / 100, y)),
      }));
      return {
        summary: `At ${formatPercent(rate, 1)} inflation, ${formatCurrency(amount, currency, 0)} today buys what ${formatCurrency(worth, currency, 0)} buys in ${years} years.`,
        metrics: [
          {
            label: "Future purchasing power",
            value: formatCurrency(worth, currency, 0),
            emphasis: true,
          },
          {
            label: "Amount needed then",
            value: formatCurrency(needed, currency, 0),
            hint: "To match today's buying power",
          },
          { label: "Value lost", value: formatCurrency(amount - worth, currency, 0) },
          { label: "Cumulative inflation", value: formatPercent((factor - 1) * 100, 1) },
        ],
        chart: {
          type: "area",
          title: "Purchasing power vs equivalent cost",
          xKey: "year",
          data,
          series: [
            { key: "Purchasing power", label: "Purchasing power", color: "var(--color-chart-5)" },
            { key: "Equivalent cost", label: "Equivalent cost", color: "var(--color-chart-1)" },
          ],
        },
        steps: [
          {
            label: "Inflation factor",
            expression: `(1 + ${rate}%)^${years}`,
            result: formatNumber(factor, 3),
          },
          {
            label: "Future purchasing power",
            expression: `${formatCurrency(amount, currency, 0)} ÷ factor`,
            result: formatCurrency(worth, currency, 0),
          },
          {
            label: "Equivalent future amount",
            expression: `${formatCurrency(amount, currency, 0)} × factor`,
            result: formatCurrency(needed, currency, 0),
          },
        ],
      };
    },
    content: {
      intro:
        "Inflation is the silent tax on cash. Money held under a mattress loses roughly a quarter of its value every decade at 3% inflation, even though the number on the note never changes.",
      what: "An inflation calculator converts an amount of money between today's purchasing power and a future or past equivalent, using a compound annual inflation rate.",
      how: [
        "Enter the amount you want to test.",
        "Choose an average annual inflation rate — long-run averages sit around 2–3% in developed economies.",
        "Set the number of years into the future.",
        "Read both figures: what your money will buy, and what you would need to keep pace.",
      ],
      formula: "Future value = Amount × (1 + i)ᵗ;  Purchasing power = Amount ÷ (1 + i)ᵗ",
      formulaNote: "i is the annual inflation rate and t the number of years.",
      example:
        "At 3% inflation, 50,000 today has the buying power of about 27,700 in twenty years, and you would need roughly 90,300 then to buy what 50,000 buys now.",
      advantages: [
        "Makes long-term financial goals realistic rather than nominal.",
        "Useful for pricing salaries, pensions and retirement targets.",
        "Explains why cash savings need to earn at least the inflation rate.",
      ],
      limitations: [
        "Uses a single average rate; real inflation varies year to year.",
        "Personal inflation depends on your own spending basket.",
        "Does not model deflation shocks or currency effects.",
      ],
      howWorks:
        "The calculator applies compound interest formulas in both directions. It calculates future value by multiplying the current amount by (1 + inflation rate) raised to the power of years. It calculates present value by dividing the current amount by the same factor. The chart visualises both trajectories on the same graph.",
      assumptions: [
        "Inflation is constant at the specified rate throughout the period.",
        "Purchasing power changes uniformly across all goods and services.",
        "No changes in tax treatment of inflation-adjusted amounts.",
        "The currency remains stable (no hyperinflation or deflation scenarios).",
        "Prices adjust immediately and uniformly with inflation.",
        "No wage-price spirals or other economic feedback effects are modelled.",
      ],
      commonMistakes: [
        "Using an inflation rate that's too low based on personal experience with stable prices.",
        "Forgetting that inflation erodes the real value of fixed incomes and savings.",
        "Not accounting for the fact that different people experience different inflation rates based on spending habits.",
        "Using historical rates without adjusting for current economic conditions.",
        "Assuming that a 3% inflation rate means prices increase by exactly 3% each year (they compound).",
        "Not understanding that nominal values can appear large while real values are much smaller.",
        "Forgetting to adjust future goals and savings targets for inflation.",
        "Comparing nominal dollar amounts from different time periods without adjusting for inflation.",
        "Using the wrong formula (simple vs compound) for inflation calculations.",
        "Not considering that some assets (real estate, commodities) may hedge against inflation.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Compound interest formulas for future and present value",
        version: "1.0.0",
      },
    },
    faqs: [
      {
        question: "What is a normal inflation rate?",
        answer:
          "Most developed-market central banks target around 2%. Long-run realised averages are often closer to 3% once inflationary periods are included.",
      },
      {
        question: "How does inflation affect savings?",
        answer:
          "If your account pays less than the inflation rate, your balance grows but your purchasing power shrinks. That is a negative real return.",
      },
      {
        question: "What protects against inflation?",
        answer:
          "Equities, index-linked bonds, real estate and, over long horizons, broad diversification tend to outpace inflation better than cash.",
      },
      {
        question: "Is inflation the same for everyone?",
        answer:
          "No. Headline inflation is an average basket. If your spending skews toward rent, energy or education, your personal rate can be much higher.",
      },
    ],
    related: ["investment-calculator", "retirement-calculator", "savings-calculator"],
  },
];
