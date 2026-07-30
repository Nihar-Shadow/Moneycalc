import { formatCurrency, formatMonths, formatPercent, monthlyPayment } from "@/lib/format";
import type { CalculatorConfig } from "../types";

interface YearRow {
  year: number;
  balance: number;
  interest: number;
  principal: number;
}

function amortize(principal: number, annualRatePct: number, months: number) {
  const r = annualRatePct / 100 / 12;
  const pmt = monthlyPayment(principal, annualRatePct, months);
  let balance = principal;
  let totalInterest = 0;
  const years: YearRow[] = [{ year: 0, balance: principal, interest: 0, principal: 0 }];
  let yearInterest = 0;
  let yearPrincipal = 0;

  for (let m = 1; m <= months; m += 1) {
    const interest = balance * r;
    const principalPart = Math.min(pmt - interest, balance);
    balance = Math.max(balance - principalPart, 0);
    totalInterest += interest;
    yearInterest += interest;
    yearPrincipal += principalPart;
    if (m % 12 === 0 || m === months) {
      years.push({
        year: Math.ceil(m / 12),
        balance,
        interest: yearInterest,
        principal: yearPrincipal,
      });
      yearInterest = 0;
      yearPrincipal = 0;
    }
  }
  return { pmt, totalInterest, years };
}

function payoffSimulation(balance: number, aprPct: number, payment: number) {
  const r = aprPct / 100 / 12;
  let bal = balance;
  let months = 0;
  let interest = 0;
  const points: { month: number; balance: number }[] = [{ month: 0, balance: bal }];
  while (bal > 0 && months < 1200) {
    const monthInterest = bal * r;
    if (payment <= monthInterest) return { months: Infinity, interest: Infinity, points };
    bal = bal + monthInterest - payment;
    interest += monthInterest;
    months += 1;
    if (bal < 0) bal = 0;
    if (months % 3 === 0 || bal === 0) points.push({ month: months, balance: bal });
  }
  return { months, interest, points };
}

export const loanCalculators: CalculatorConfig[] = [
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    shortName: "Loan",
    title: "Loan Calculator — Monthly Payment & Total Interest",
    description:
      "Calculate monthly loan payments, total interest and a full amortization outlook for personal loans, student loans and business loans.",
    keywords: ["loan calculator", "monthly payment calculator", "amortization", "personal loan"],
    category: "Loans",
    icon: "Banknote",
    popular: true,
    fields: [
      {
        name: "amount",
        label: "Loan amount",
        type: "currency",
        defaultValue: 25000,
        min: 100,
        step: 500,
      },
      {
        name: "rate",
        label: "Interest rate (APR)",
        type: "percent",
        defaultValue: 8.5,
        min: 0,
        max: 60,
        step: 0.05,
      },
      {
        name: "years",
        label: "Loan term",
        type: "years",
        defaultValue: 5,
        min: 1,
        max: 40,
        step: 1,
      },
    ],
    compute: ({ amount, rate, years }, currency) => {
      const months = Math.round(years * 12);
      const { pmt, totalInterest, years: rows } = amortize(amount, rate, months);
      const total = pmt * months;
      return {
        summary: `A ${formatCurrency(amount, currency, 0)} loan at ${formatPercent(rate)} over ${years} years costs ${formatCurrency(pmt, currency)} per month.`,
        metrics: [
          { label: "Monthly payment", value: formatCurrency(pmt, currency), emphasis: true },
          { label: "Total interest", value: formatCurrency(totalInterest, currency) },
          { label: "Total repaid", value: formatCurrency(total, currency) },
          {
            label: "Interest share",
            value: formatPercent((totalInterest / total) * 100, 1),
            hint: "Portion of every payment lost to interest",
          },
        ],
        chart: {
          type: "area",
          title: "Remaining balance by year",
          xKey: "year",
          data: rows.map((r) => ({ year: `Yr ${r.year}`, Balance: Math.round(r.balance) })),
          series: [{ key: "Balance", label: "Balance", color: "var(--color-chart-1)" }],
        },
        steps: [
          {
            label: "Monthly rate",
            expression: `${rate}% ÷ 12`,
            result: formatPercent(rate / 12, 4),
          },
          { label: "Number of payments", expression: `${years} × 12`, result: `${months}` },
          {
            label: "Payment formula",
            expression: "P × r ÷ (1 − (1 + r)^−n)",
            result: formatCurrency(pmt, currency),
          },
          {
            label: "Total interest",
            expression: `(${formatCurrency(pmt, currency)} × ${months}) − ${formatCurrency(amount, currency, 0)}`,
            result: formatCurrency(totalInterest, currency),
          },
        ],
      };
    },
    content: {
      intro:
        "A loan calculator turns three simple numbers — amount borrowed, interest rate and term — into the one figure that actually affects your budget: the monthly payment. It also reveals the hidden cost of borrowing, the total interest you will pay over the life of the loan.",
      what: "This loan calculator estimates the fixed monthly payment on an amortising loan, where each payment covers accrued interest first and reduces the principal with whatever is left. It works for personal loans, student loans, equipment finance and most fixed-rate instalment credit.",
      how: [
        "Enter the amount you plan to borrow, excluding any fees rolled into the balance.",
        "Add the annual percentage rate quoted by the lender.",
        "Choose the repayment term in years — longer terms lower the payment but raise total interest.",
        "Review the payment, total interest and the balance curve to compare offers side by side.",
      ],
      formula: "M = P × r / (1 − (1 + r)⁻ⁿ)",
      formulaNote:
        "M is the monthly payment, P the principal, r the monthly interest rate (APR ÷ 12) and n the total number of monthly payments.",
      example:
        "Borrowing 25,000 at 8.5% APR over five years produces a monthly payment of roughly 512.83. Across 60 payments you repay about 30,770, meaning interest costs around 5,770 — close to 23% of everything you hand over.",
      advantages: [
        "Instantly compares competing loan offers on a like-for-like monthly basis.",
        "Shows the total interest cost that lenders rarely advertise up front.",
        "Helps you test whether a shorter term is affordable before you apply.",
      ],
      limitations: [
        "Assumes a fixed rate; variable-rate loans will drift from this schedule.",
        "Origination fees, insurance and late charges are not included.",
        "Extra payments are not modelled here — use the debt payoff calculator for that.",
      ],
      howWorks:
        "The calculator uses the amortisation formula to compute a fixed monthly payment that pays off the loan in the specified term. Each payment is split: first, interest accrues on the remaining balance; second, the rest reduces the principal. Over time, the interest portion shrinks while the principal portion grows. The balance curve visualises this shift.",
      assumptions: [
        "Fixed interest rate for the entire loan term.",
        "Monthly payment frequency with no skipped payments.",
        "No prepayment penalties or early repayment charges.",
        "No additional fees (origination, late fees, etc.).",
        "Payments are made on time without delay.",
      ],
      commonMistakes: [
        "Using the annual rate instead of the monthly rate in calculations.",
        "Forgetting to include all fees in the true cost of borrowing.",
        "Choosing an excessively long term to lower the payment, then paying more interest than expected.",
        "Comparing loans with different terms without adjusting for the payment frequency.",
        "Ignoring the impact of prepayment options or penalties.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Standard amortisation formula with monthly compounding",
        version: "1.0.0",
      },
    },
    faqs: [
      {
        question: "How is a monthly loan payment calculated?",
        answer:
          "Lenders use the amortisation formula M = P × r / (1 − (1 + r)⁻ⁿ). The payment stays constant, but the split between interest and principal shifts toward principal over time.",
      },
      {
        question: "Does a longer loan term save money?",
        answer:
          "A longer term lowers the monthly payment but almost always increases total interest, because the balance stays outstanding for more months.",
      },
      {
        question: "What is the difference between interest rate and APR?",
        answer:
          "The interest rate prices the borrowed money alone. APR folds in lender fees, so it is the fairer number when comparing two offers.",
      },
      {
        question: "Can I pay a loan off early?",
        answer:
          "Most personal loans allow early repayment, which cuts interest sharply. Check for prepayment penalties before making a lump-sum payment.",
      },
    ],
    related: ["auto-loan-calculator", "mortgage-calculator", "debt-payoff-calculator"],
  },
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    shortName: "Mortgage",
    title: "Mortgage Calculator — Monthly Payment, Taxes & Insurance",
    description:
      "Estimate your full monthly mortgage payment including principal, interest, property tax, home insurance and HOA fees, plus lifetime interest cost.",
    keywords: ["mortgage calculator", "home loan calculator", "monthly mortgage payment", "PITI"],
    category: "Real Estate",
    icon: "Home",
    popular: true,
    fields: [
      {
        name: "price",
        label: "Home price",
        type: "currency",
        defaultValue: 420000,
        min: 1000,
        step: 5000,
      },
      {
        name: "downPct",
        label: "Down payment",
        type: "percent",
        defaultValue: 20,
        min: 0,
        max: 100,
        step: 0.5,
      },
      {
        name: "rate",
        label: "Interest rate",
        type: "percent",
        defaultValue: 6.5,
        min: 0,
        max: 25,
        step: 0.05,
      },
      {
        name: "years",
        label: "Loan term",
        type: "years",
        defaultValue: 30,
        min: 5,
        max: 40,
        step: 1,
      },
      {
        name: "taxPct",
        label: "Property tax rate (yearly)",
        type: "percent",
        defaultValue: 1.1,
        min: 0,
        max: 10,
        step: 0.05,
      },
      {
        name: "insurance",
        label: "Home insurance (yearly)",
        type: "currency",
        defaultValue: 1800,
        min: 0,
        step: 100,
      },
      {
        name: "hoa",
        label: "HOA fees (monthly)",
        type: "currency",
        defaultValue: 0,
        min: 0,
        step: 25,
      },
    ],
    compute: ({ price, downPct, rate, years, taxPct, insurance, hoa }, currency) => {
      const down = price * (downPct / 100);
      const principal = Math.max(price - down, 0);
      const months = Math.round(years * 12);
      const { pmt, totalInterest, years: rows } = amortize(principal, rate, months);
      const tax = (price * (taxPct / 100)) / 12;
      const ins = insurance / 12;
      const totalMonthly = pmt + tax + ins + hoa;
      return {
        summary: `Buying at ${formatCurrency(price, currency, 0)} with ${formatPercent(downPct, 1)} down puts your all-in monthly housing cost near ${formatCurrency(totalMonthly, currency)}.`,
        metrics: [
          {
            label: "Total monthly payment",
            value: formatCurrency(totalMonthly, currency),
            emphasis: true,
          },
          { label: "Principal & interest", value: formatCurrency(pmt, currency) },
          { label: "Down payment", value: formatCurrency(down, currency, 0) },
          { label: "Loan amount", value: formatCurrency(principal, currency, 0) },
          { label: "Total interest paid", value: formatCurrency(totalInterest, currency, 0) },
          { label: "Tax + insurance + HOA", value: formatCurrency(tax + ins + hoa, currency) },
        ],
        chart: {
          type: "pie",
          title: "Monthly payment breakdown",
          data: [
            { name: "Principal & interest", value: Math.round(pmt) },
            { name: "Property tax", value: Math.round(tax) },
            { name: "Insurance", value: Math.round(ins) },
            { name: "HOA", value: Math.round(hoa) },
          ].filter((d) => d.value > 0),
          series: [{ key: "value", label: "Monthly", color: "var(--color-chart-1)" }],
        },
        steps: [
          {
            label: "Loan amount",
            expression: `${formatCurrency(price, currency, 0)} − ${formatCurrency(down, currency, 0)}`,
            result: formatCurrency(principal, currency, 0),
          },
          {
            label: "Monthly rate",
            expression: `${rate}% ÷ 12`,
            result: formatPercent(rate / 12, 4),
          },
          {
            label: "Principal & interest",
            expression: "P × r ÷ (1 − (1 + r)⁻ⁿ)",
            result: formatCurrency(pmt, currency),
          },
          {
            label: "Escrow items",
            expression: "tax ÷ 12 + insurance ÷ 12 + HOA",
            result: formatCurrency(tax + ins + hoa, currency),
          },
          {
            label: "Total payment",
            expression: "P&I + escrow",
            result: formatCurrency(totalMonthly, currency),
          },
        ],
        table: {
          columns: ["Year", "Interest paid", "Principal paid", "Balance"],
          rows: rows
            .filter(
              (r) => r.year > 0 && (r.year % 5 === 0 || r.year === rows[rows.length - 1].year),
            )
            .map((r) => [
              `${r.year}`,
              formatCurrency(r.interest, currency, 0),
              formatCurrency(r.principal, currency, 0),
              formatCurrency(r.balance, currency, 0),
            ]),
        },
      };
    },
    content: {
      intro:
        "Your mortgage payment is more than principal and interest. Property tax, home insurance and association fees can add 20–30% on top, which is why so many buyers are surprised at closing. This calculator shows the complete monthly number.",
      what: "A mortgage calculator estimates the full PITI payment — principal, interest, taxes and insurance — for a fixed-rate home loan, along with the total interest paid across the life of the mortgage.",
      how: [
        "Enter the purchase price and the percentage you plan to put down.",
        "Add the quoted interest rate and the term, usually 15 or 30 years.",
        "Include your local property tax rate and an annual insurance estimate.",
        "Add HOA dues if the property has them, then review the breakdown chart.",
      ],
      formula: "Payment = [P × r / (1 − (1 + r)⁻ⁿ)] + tax/12 + insurance/12 + HOA",
      formulaNote:
        "P is the loan amount after the down payment, r the monthly rate and n the number of monthly payments.",
      example:
        "On a 420,000 home with 20% down at 6.5% over 30 years, principal and interest come to about 2,124 a month. Adding 1.1% property tax and 1,800 of insurance pushes the true monthly cost above 2,660.",
      advantages: [
        "Reveals the real cost of ownership rather than just the loan payment.",
        "Makes it easy to test how a larger down payment changes affordability.",
        "Shows how much of the early years goes almost entirely to interest.",
      ],
      limitations: [
        "Private mortgage insurance is not modelled for down payments under 20%.",
        "Closing costs, maintenance and utilities sit outside the calculation.",
        "Adjustable-rate mortgages will diverge once the fixed period ends.",
      ],
      howWorks:
        "This calculator first computes the principal and interest payment using the amortisation formula. It then adds the monthly property tax (annual tax rate × home price ÷ 12), monthly home insurance (annual insurance ÷ 12), and any HOA dues. The total is displayed as the 'all-in' monthly payment.",
      assumptions: [
        "Fixed mortgage interest rate for the entire loan term.",
        "Property tax rate remains constant over the loan term.",
        "Home insurance premiums do not change annually.",
        "HOA fees are fixed and known.",
        "PMI is not included for down payments under 20%.",
        "No additional closing costs, private mortgage insurance, or loan origination fees.",
      ],
      commonMistakes: [
        "Focusing only on the P&I payment and ignoring property taxes and insurance.",
        "Using the annual property tax rate directly instead of dividing by 12 for monthly.",
        "Forgetting that taxes and insurance may increase annually.",
        "Not accounting for HOA fees if applicable.",
        "Assuming the quoted rate is the APR without considering the true cost.",
        "Using the down payment percentage incorrectly in the calculation.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Standard amortisation formula with PITI components",
        version: "1.0.0",
      },
    },
    faqs: [
      {
        question: "How much house can I afford?",
        answer:
          "A common guideline keeps total housing costs under 28% of gross monthly income and all debt payments under 36%. Enter different prices here until the payment lands inside that range.",
      },
      {
        question: "Is a 15-year mortgage better than a 30-year?",
        answer:
          "A 15-year loan carries a higher payment but can cut lifetime interest by more than half. Choose it only if the higher payment still leaves room to save and invest.",
      },
      {
        question: "What is PITI?",
        answer:
          "PITI stands for principal, interest, taxes and insurance — the four components lenders count when they assess whether you can afford a home.",
      },
      {
        question: "Do I need 20% down?",
        answer:
          "No, but below 20% most lenders require mortgage insurance, which adds to the monthly cost until you build enough equity.",
      },
    ],
    related: ["loan-calculator", "savings-calculator", "auto-loan-calculator"],
  },
  {
    slug: "auto-loan-calculator",
    name: "Auto Loan Calculator",
    shortName: "Auto Loan",
    title: "Auto Loan Calculator — Car Payment & Total Cost",
    description:
      "Work out your monthly car payment including sales tax, down payment and trade-in value, and see the total interest you will pay on the auto loan.",
    keywords: [
      "auto loan calculator",
      "car payment calculator",
      "vehicle finance",
      "car loan interest",
    ],
    category: "Loans",
    icon: "Car",
    popular: true,
    fields: [
      {
        name: "price",
        label: "Vehicle price",
        type: "currency",
        defaultValue: 32000,
        min: 500,
        step: 500,
      },
      {
        name: "down",
        label: "Down payment",
        type: "currency",
        defaultValue: 4000,
        min: 0,
        step: 250,
      },
      {
        name: "tradeIn",
        label: "Trade-in value",
        type: "currency",
        defaultValue: 0,
        min: 0,
        step: 250,
      },
      {
        name: "taxPct",
        label: "Sales tax",
        type: "percent",
        defaultValue: 7,
        min: 0,
        max: 25,
        step: 0.1,
      },
      {
        name: "rate",
        label: "Interest rate (APR)",
        type: "percent",
        defaultValue: 7.2,
        min: 0,
        max: 30,
        step: 0.05,
      },
      {
        name: "months",
        label: "Loan term (months)",
        type: "months",
        defaultValue: 60,
        min: 6,
        max: 96,
        step: 6,
      },
    ],
    compute: ({ price, down, tradeIn, taxPct, rate, months }, currency) => {
      const taxable = Math.max(price - tradeIn, 0);
      const tax = taxable * (taxPct / 100);
      const financed = Math.max(price + tax - down - tradeIn, 0);
      const { pmt, totalInterest, years: rows } = amortize(financed, rate, months);
      return {
        summary: `Financing ${formatCurrency(financed, currency, 0)} at ${formatPercent(rate)} for ${months} months gives a payment of ${formatCurrency(pmt, currency)}.`,
        metrics: [
          { label: "Monthly payment", value: formatCurrency(pmt, currency), emphasis: true },
          { label: "Amount financed", value: formatCurrency(financed, currency, 0) },
          { label: "Sales tax", value: formatCurrency(tax, currency, 0) },
          { label: "Total interest", value: formatCurrency(totalInterest, currency) },
          {
            label: "Total cost of vehicle",
            value: formatCurrency(down + tradeIn + pmt * months, currency, 0),
          },
        ],
        chart: {
          type: "area",
          title: "Loan balance over time",
          xKey: "year",
          data: rows.map((r) => ({ year: `Yr ${r.year}`, Balance: Math.round(r.balance) })),
          series: [{ key: "Balance", label: "Balance", color: "var(--color-chart-1)" }],
        },
        steps: [
          {
            label: "Taxable amount",
            expression: `${formatCurrency(price, currency, 0)} − trade-in`,
            result: formatCurrency(taxable, currency, 0),
          },
          {
            label: "Sales tax",
            expression: `${taxPct}% × taxable amount`,
            result: formatCurrency(tax, currency, 0),
          },
          {
            label: "Amount financed",
            expression: "price + tax − down − trade-in",
            result: formatCurrency(financed, currency, 0),
          },
          {
            label: "Monthly payment",
            expression: "P × r ÷ (1 − (1 + r)⁻ⁿ)",
            result: formatCurrency(pmt, currency),
          },
        ],
      };
    },
    content: {
      intro:
        "Dealers negotiate on monthly payment because it hides the true price of a car. Stretching a loan from 48 to 84 months makes almost any vehicle look affordable while quietly adding thousands in interest.",
      what: "An auto loan calculator estimates the monthly payment on a car loan after accounting for sales tax, your down payment and any trade-in credit, and shows the total interest across the term.",
      how: [
        "Enter the negotiated vehicle price, not the sticker price.",
        "Add your cash down payment and the value the dealer allows for your trade-in.",
        "Set the local sales tax rate — many states tax the price after the trade-in credit.",
        "Choose an APR and term, then compare 48, 60 and 72 months to see the interest difference.",
      ],
      formula: "Financed = price + tax − down − trade-in;  M = F × r / (1 − (1 + r)⁻ⁿ)",
      formulaNote: "r is the monthly APR and n the number of monthly payments in the term.",
      example:
        "A 32,000 car with 4,000 down, 7% sales tax and a 7.2% APR over 60 months finances about 29,960 and costs roughly 596 a month, with close to 5,800 in interest.",
      advantages: [
        "Includes tax and trade-in so the payment reflects the real out-the-door deal.",
        "Makes long-term financing traps obvious before you sign.",
        "Helps you set a realistic budget before walking into a dealership.",
      ],
      limitations: [
        "Dealer add-ons, extended warranties and gap insurance are excluded.",
        "Manufacturer rebates and subsidised APR offers need to be entered manually.",
        "Depreciation and running costs are not part of the payment estimate.",
      ],
      howWorks:
        "The calculator first determines the taxable amount (vehicle price minus trade-in value), then calculates sales tax. It then computes the financed amount (price + tax - down - trade-in). Finally, it applies the standard loan amortisation formula to determine the monthly payment.",
      assumptions: [
        "Fixed interest rate for the entire loan term.",
        "Sales tax is applied after the trade-in credit is subtracted.",
        "No dealer add-ons, extended warranties, or gap insurance.",
        "No manufacturer rebates or subsidised APR offers are applied.",
        "The vehicle depreciates immediately upon purchase but this is not modelled in the payment calculation.",
      ],
      commonMistakes: [
        "Using the sticker price instead of the negotiated price.",
        "Forgetting to account for trade-in value in the tax calculation.",
        "Comparing loans with different terms without adjusting for the payment frequency.",
        "Not understanding that a longer term doesn't mean it's cheaper — total interest increases.",
        "Ignoring the impact of sales tax which can add 5-10% to the total cost.",
        "Focusing on the monthly payment without considering the total cost of the loan.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Standard amortisation formula with tax and trade-in adjustments",
        version: "1.0.0",
      },
    },
    faqs: [
      {
        question: "What is a good car loan term?",
        answer:
          "Sixty months or fewer keeps interest manageable and reduces the risk of owing more than the car is worth. Terms of 72–84 months usually mean years of negative equity.",
      },
      {
        question: "Does a bigger down payment help?",
        answer:
          "Yes. Every unit of down payment reduces the financed balance directly, lowering both the monthly payment and the total interest.",
      },
      {
        question: "Is dealer financing or a bank loan better?",
        answer:
          "Get a pre-approval from a bank or credit union first, then let the dealer try to beat it. Subsidised manufacturer rates can win, but only on specific models.",
      },
      {
        question: "How does a trade-in affect sales tax?",
        answer:
          "In many jurisdictions sales tax applies to the price after the trade-in credit, which is why this calculator subtracts the trade-in before taxing.",
      },
    ],
    related: ["loan-calculator", "debt-payoff-calculator", "savings-calculator"],
  },
  {
    slug: "credit-card-payoff-calculator",
    name: "Credit Card Payoff Calculator",
    shortName: "Card Payoff",
    title: "Credit Card Payoff Calculator — Time & Interest to Zero",
    description:
      "See how long it takes to clear a credit card balance, how much interest you will pay, and how a bigger monthly payment shortens the payoff.",
    keywords: [
      "credit card payoff calculator",
      "credit card interest",
      "pay off debt",
      "minimum payment",
    ],
    category: "Credit Cards",
    icon: "CreditCard",
    popular: true,
    fields: [
      {
        name: "balance",
        label: "Card balance",
        type: "currency",
        defaultValue: 6500,
        min: 1,
        step: 100,
      },
      {
        name: "apr",
        label: "Card APR",
        type: "percent",
        defaultValue: 22.9,
        min: 0,
        max: 60,
        step: 0.1,
      },
      {
        name: "payment",
        label: "Monthly payment",
        type: "currency",
        defaultValue: 250,
        min: 1,
        step: 10,
      },
      {
        name: "extra",
        label: "Extra monthly payment",
        type: "currency",
        defaultValue: 0,
        min: 0,
        step: 10,
      },
    ],
    compute: ({ balance, apr, payment, extra }, currency) => {
      const base = payoffSimulation(balance, apr, payment);
      const boosted = payoffSimulation(balance, apr, payment + extra);
      const impossible = !Number.isFinite(boosted.months);
      return {
        summary: impossible
          ? "Your payment does not cover the monthly interest, so the balance will never fall. Increase the payment above the interest charge."
          : `Paying ${formatCurrency(payment + extra, currency)} a month clears ${formatCurrency(balance, currency, 0)} in ${formatMonths(boosted.months)}.`,
        metrics: [
          {
            label: "Time to payoff",
            value: impossible ? "Never" : formatMonths(boosted.months),
            emphasis: true,
          },
          {
            label: "Total interest",
            value: impossible ? "—" : formatCurrency(boosted.interest, currency),
          },
          {
            label: "Total paid",
            value: impossible ? "—" : formatCurrency(balance + boosted.interest, currency),
          },
          {
            label: "Saved by extra payment",
            value:
              extra > 0 && Number.isFinite(base.interest) && Number.isFinite(boosted.interest)
                ? formatCurrency(base.interest - boosted.interest, currency)
                : formatCurrency(0, currency),
            hint: "Interest avoided versus the base payment",
          },
          {
            label: "First month interest",
            value: formatCurrency((balance * apr) / 100 / 12, currency),
          },
        ],
        chart: {
          type: "area",
          title: "Balance countdown",
          xKey: "month",
          data: (impossible ? base.points : boosted.points).map((p) => ({
            month: `M${p.month}`,
            Balance: Math.round(p.balance),
          })),
          series: [{ key: "Balance", label: "Balance", color: "var(--color-chart-5)" }],
        },
        steps: [
          { label: "Monthly rate", expression: `${apr}% ÷ 12`, result: formatPercent(apr / 12, 4) },
          {
            label: "First month interest",
            expression: "balance × monthly rate",
            result: formatCurrency((balance * apr) / 100 / 12, currency),
          },
          {
            label: "Principal reduced",
            expression: "payment − interest",
            result: formatCurrency(payment + extra - (balance * apr) / 100 / 12, currency),
          },
          {
            label: "Repeat until zero",
            expression: "iterate monthly",
            result: impossible ? "Never clears" : formatMonths(boosted.months),
          },
        ],
      };
    },
    content: {
      intro:
        "Credit card interest compounds monthly at rates that dwarf almost every other consumer debt. Paying the minimum on a mid-sized balance can keep you in debt for a decade — this calculator shows exactly how long, and what a slightly larger payment buys you.",
      what: "This calculator simulates a credit card balance month by month: interest is added, your payment is subtracted, and the loop repeats until the balance reaches zero.",
      how: [
        "Enter your current statement balance.",
        "Add the purchase APR shown on your statement.",
        "Enter the payment you make each month, then test an extra amount.",
        "Compare the payoff time and interest saved before choosing a strategy.",
      ],
      formula: "Balanceₙ₊₁ = Balanceₙ × (1 + APR/12) − payment",
      formulaNote:
        "There is no closed-form shortcut when payments are fixed and interest compounds, so the balance is simulated one month at a time.",
      example:
        "A 6,500 balance at 22.9% APR with a 250 monthly payment takes about 3 years to clear and costs roughly 2,300 in interest. Adding just 100 a month cuts more than a year and around 800 of interest.",
      advantages: [
        "Turns an abstract APR into a concrete payoff date.",
        "Quantifies the value of every extra unit you throw at the balance.",
        "Warns you when a payment is too small to make progress at all.",
      ],
      limitations: [
        "Assumes no new purchases are added to the card.",
        "Promotional 0% periods and balance-transfer fees are not modelled.",
        "Issuers calculate interest daily; monthly compounding is a close approximation.",
      ],
      howWorks:
        "The calculator uses an iterative approach to simulate each month: it calculates the interest (current balance × monthly APR), adds it to the balance, then subtracts the payment. This process repeats until the balance reaches zero or the payment becomes insufficient to cover interest. The iteration reveals the exact payoff timeline and total interest cost.",
      assumptions: [
        "Interest compounds monthly at the stated APR.",
        "No new charges are added to the card during the payoff period.",
        "The payment amount remains constant throughout the payoff.",
        "No balance transfer fees or promotional APRs are applied.",
        "The APR remains fixed for the entire payoff period.",
        "No annual fees or other charges are applied.",
      ],
      commonMistakes: [
        "Paying only the minimum payment, which barely covers interest in early years.",
        "Not understanding that interest compounds on the full balance even as you make payments.",
        "Using the annual APR directly instead of dividing by 12 for monthly calculations.",
        "Forgetting to include fees like balance transfer fees or annual fees in the total cost.",
        "Assuming a payment is enough without checking that it exceeds the monthly interest charge.",
        "Not considering the impact of promotional 0% APR periods that may expire.",
        "Making only minimum payments while continuing to charge new purchases.",
        "Ignoring the snowball or avalanche methods for multiple cards.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Iterative monthly interest simulation",
        version: "1.0.0",
      },
    },
    faqs: [
      {
        question: "Why does paying the minimum take so long?",
        answer:
          "Minimum payments are typically 1–3% of the balance, barely above the monthly interest charge, so almost nothing goes to principal in the early years.",
      },
      {
        question: "Should I pay off the highest APR card first?",
        answer:
          "Mathematically yes — the avalanche method minimises interest. The snowball method, paying the smallest balance first, wins on motivation instead.",
      },
      {
        question: "Does a balance transfer help?",
        answer:
          "A 0% transfer can save a lot if you clear the balance before the promotional period ends. Factor in the transfer fee, usually 3–5%.",
      },
      {
        question: "How is credit card interest actually charged?",
        answer:
          "Most issuers apply a daily periodic rate to the average daily balance. Monthly compounding, as used here, produces very similar totals.",
      },
    ],
    related: ["debt-payoff-calculator", "loan-calculator", "savings-calculator"],
  },
  {
    slug: "debt-payoff-calculator",
    name: "Debt Payoff Calculator",
    shortName: "Debt Payoff",
    title: "Debt Payoff Calculator — Snowball vs Extra Payments",
    description:
      "Plan your route out of debt. Compare your current payment with an accelerated plan and see how many months and how much interest you save.",
    keywords: ["debt payoff calculator", "debt snowball", "pay off debt faster", "debt free date"],
    category: "Personal Finance",
    icon: "TrendingDown",
    fields: [
      {
        name: "balance",
        label: "Total debt balance",
        type: "currency",
        defaultValue: 18000,
        min: 1,
        step: 500,
      },
      {
        name: "apr",
        label: "Average interest rate",
        type: "percent",
        defaultValue: 16,
        min: 0,
        max: 60,
        step: 0.1,
      },
      {
        name: "payment",
        label: "Current monthly payment",
        type: "currency",
        defaultValue: 450,
        min: 1,
        step: 25,
      },
      {
        name: "extra",
        label: "Extra monthly payment",
        type: "currency",
        defaultValue: 150,
        min: 0,
        step: 25,
      },
    ],
    compute: ({ balance, apr, payment, extra }, currency) => {
      const base = payoffSimulation(balance, apr, payment);
      const fast = payoffSimulation(balance, apr, payment + extra);
      const feasible = Number.isFinite(base.months) && Number.isFinite(fast.months);
      return {
        summary: feasible
          ? `Adding ${formatCurrency(extra, currency, 0)} a month makes you debt free in ${formatMonths(fast.months)} instead of ${formatMonths(base.months)}.`
          : "The current payment is smaller than the monthly interest, so the debt grows. Increase the payment to build a payoff plan.",
        metrics: [
          {
            label: "Debt free in",
            value: feasible ? formatMonths(fast.months) : "Never",
            emphasis: true,
          },
          { label: "Without extra payment", value: feasible ? formatMonths(base.months) : "Never" },
          {
            label: "Months saved",
            value: feasible ? `${Math.round(base.months - fast.months)}` : "—",
          },
          {
            label: "Interest saved",
            value: feasible ? formatCurrency(base.interest - fast.interest, currency) : "—",
          },
          {
            label: "Total interest (accelerated)",
            value: feasible ? formatCurrency(fast.interest, currency) : "—",
          },
        ],
        chart: {
          type: "area",
          title: "Balance with and without extra payments",
          xKey: "month",
          data: base.points.map((p, i) => ({
            month: `M${p.month}`,
            Current: Math.round(p.balance),
            Accelerated: Math.round(fast.points[i]?.balance ?? 0),
          })),
          series: [
            { key: "Current", label: "Current plan", color: "var(--color-chart-5)" },
            { key: "Accelerated", label: "Accelerated plan", color: "var(--color-chart-2)" },
          ],
        },
        steps: [
          { label: "Monthly rate", expression: `${apr}% ÷ 12`, result: formatPercent(apr / 12, 4) },
          {
            label: "Base payoff",
            expression: `simulate at ${formatCurrency(payment, currency, 0)}/mo`,
            result: feasible ? formatMonths(base.months) : "Never",
          },
          {
            label: "Accelerated payoff",
            expression: `simulate at ${formatCurrency(payment + extra, currency, 0)}/mo`,
            result: feasible ? formatMonths(fast.months) : "Never",
          },
          {
            label: "Interest difference",
            expression: "base interest − accelerated interest",
            result: feasible ? formatCurrency(base.interest - fast.interest, currency) : "—",
          },
        ],
      };
    },
    content: {
      intro:
        "Every extra unit you send to a debt is a guaranteed, tax-free return equal to the interest rate. This calculator quantifies that return by comparing your current payment plan against an accelerated one.",
      what: "A debt payoff calculator models the combined balance of your consumer debts at an average interest rate and shows the payoff date, total interest and the savings from paying more each month.",
      how: [
        "Add up the balances of the debts you want to attack and enter the total.",
        "Estimate a blended interest rate weighted by balance size.",
        "Enter what you currently pay each month across those debts.",
        "Test extra payment amounts until the debt free date looks achievable.",
      ],
      formula: "Balanceₙ₊₁ = Balanceₙ × (1 + APR/12) − (payment + extra)",
      formulaNote:
        "The simulation repeats monthly until the balance hits zero, tracking cumulative interest along the way.",
      example:
        "Carrying 18,000 at 16% while paying 450 a month takes about 5 years and costs over 8,000 in interest. Adding 150 a month cuts roughly 20 months and thousands of interest from the plan.",
      advantages: [
        "Gives you a concrete debt free date to aim at.",
        "Shows the exact payoff value of a raise, side income or cut expense.",
        "Works for a single debt or a blended portfolio of consumer debts.",
      ],
      limitations: [
        "Uses one blended rate rather than tracking each debt separately.",
        "Does not order payoffs by avalanche or snowball priority.",
        "Assumes no new borrowing during the payoff period.",
      ],
      howWorks:
        "The calculator treats all your debts as a single 'blended' loan with an average interest rate. It then simulates each month: interest is calculated on the current balance, your payment (plus any extra) is subtracted, and the process repeats until the balance reaches zero. The comparison shows how much faster you get there with extra payments.",
      assumptions: [
        "A blended average interest rate represents all debts.",
        "No new debt is added during the payoff period.",
        "All payments are made on time each month.",
        "The interest rate remains constant throughout the payoff.",
        "No debt consolidation loans or balance transfers are involved.",
        "The extra payment is applied consistently each month.",
      ],
      commonMistakes: [
        "Not building a small emergency buffer before aggressively paying down debt.",
        "Using the minimum payment amounts instead of the actual amounts being paid.",
        "Forgetting to include all debts including small ones that can be paid off quickly.",
        "Not accounting for balance transfer fees or promotional APR expiration.",
        "Using the wrong interest rate (factoring in principal payments instead of APR).",
        "Assuming extra payments are automatically applied to principal without checking.",
        "Not considering the avalanche method (highest rate first) vs. snowball method (smallest balance first).",
        "Stopping payments once the calculated date is reached instead of continuing to pay off remaining balances.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Iterative monthly interest simulation with blended rate",
        version: "1.0.0",
      },
    },
    faqs: [
      {
        question: "Snowball or avalanche — which is better?",
        answer:
          "Avalanche, paying the highest rate first, minimises total interest. Snowball, clearing the smallest balance first, delivers quick wins that keep many people on plan. The best method is the one you finish.",
      },
      {
        question: "Should I save or pay off debt first?",
        answer:
          "Build a small emergency buffer, capture any employer retirement match, then aggressively pay anything above roughly 8% interest before investing more.",
      },
      {
        question: "Will paying off debt improve my credit score?",
        answer:
          "Lowering revolving balances reduces credit utilisation, which is a major scoring factor. Improvements often show within one or two statement cycles.",
      },
      {
        question: "Does consolidating debt help?",
        answer:
          "Consolidation helps only if the new rate is genuinely lower and you avoid re-running balances back up on the cleared cards.",
      },
    ],
    related: ["credit-card-payoff-calculator", "loan-calculator", "savings-calculator"],
  },
];
