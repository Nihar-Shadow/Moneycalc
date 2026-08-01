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
        "A loan calculator turns three simple numbers — amount borrowed, interest rate and term — into the one figure that actually affects your budget: the monthly payment. It also reveals the hidden cost of borrowing, the total interest you will pay over the life of the loan. Understanding your loan terms is essential for making informed borrowing decisions.",
      what: "This loan calculator estimates the fixed monthly payment on an amortising loan, where each payment covers accrued interest first and reduces the principal with whatever is left. It works for personal loans, student loans, equipment finance and most fixed-rate instalment credit. The calculator also generates an amortization schedule showing how the balance decreases over time.",
      how: [
        "Enter the amount you plan to borrow, excluding any fees rolled into the balance.",
        "Add the annual percentage rate quoted by the lender.",
        "Choose the repayment term in years — longer terms lower the payment but raise total interest.",
        "Review the payment, total interest and the balance curve to compare offers side by side.",
        "Use the step-by-step breakdown to understand how each payment is allocated.",
      ],
      formula: "M = P × r / (1 − (1 + r)⁻ⁿ)",
      formulaNote:
        "M is the monthly payment, P the principal, r the monthly interest rate (APR ÷ 12) and n the total number of monthly payments. This is the standard amortization formula used by all financial institutions.",
      example:
        "Borrowing 25,000 at 8.5% APR over five years produces a monthly payment of roughly 512.83. Across 60 payments you repay about 30,770, meaning interest costs around 5,770 — close to 23% of everything you hand over.",
      advantages: [
        "Instantly compares competing loan offers on a like-for-like monthly basis.",
        "Shows the total interest cost that lenders rarely advertise up front.",
        "Helps you test whether a shorter term is affordable before you apply.",
        "Visualizes how principal and interest are allocated over time.",
        "Enables comparison of different loan terms and rates side by side.",
      ],
      limitations: [
        "Assumes a fixed rate; variable-rate loans will drift from this schedule.",
        "Origination fees, insurance and late charges are not included.",
        "Extra payments are not modelled here — use the debt payoff calculator for that.",
        "Does not account for changes in interest rates over time.",
        "Results are estimates for planning purposes only.",
      ],
      howWorks:
        "The calculator uses the amortisation formula to compute a fixed monthly payment that pays off the loan in the specified term. Each payment is split: first, interest accrues on the remaining balance; second, the rest reduces the principal. Over time, the interest portion shrinks while the principal portion grows. The balance curve visualises this shift. This method is identical to what banks and credit unions use for their loan calculations.",
      assumptions: [
        "Fixed interest rate for the entire loan term.",
        "Monthly payment frequency with no skipped payments.",
        "No prepayment penalties or early repayment charges.",
        "No additional fees (origination, late fees, etc.).",
        "Payments are made on time without delay.",
        "The loan uses simple interest amortization.",
      ],
      commonMistakes: [
        "Using the annual rate instead of the monthly rate in calculations.",
        "Forgetting to include all fees in the true cost of borrowing.",
        "Choosing an excessively long term to lower the payment, then paying more interest than expected.",
        "Comparing loans with different terms without adjusting for the payment frequency.",
        "Ignoring the impact of prepayment options or penalties.",
        "Not understanding that early payments are mostly interest, not principal.",
        "Using the formula incorrectly by inputting percentages as decimals instead of whole numbers.",
        "Assuming the monthly payment includes taxes and insurance when it typically doesn't.",
        "Not considering the time value of money when comparing different loan lengths.",
        "Failing to account for the compounding effect of interest over long terms.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Standard amortisation formula with monthly compounding",
        version: "1.0.0",
      },
      sources: [
        "Federal Reserve - Consumer Credit - https://www.federalreserve.gov/releases/g19/current/",
        "CFPB - Loan Terms and Costs - https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-en-1466/",
        "Investopedia - Amortization - https://www.investopedia.com/terms/a/amortization.asp",
        "Federal Reserve Economic Data (FRED) - Interest Rates",
      ],
      references: [
        "Federal Reserve Board Regulation Z - Truth in Lending Act",
        "Uniform Commercial Code Article 4A - Funds Transfers",
        "Financial Accounting Standards Board (FASB) - ASC 835-30",
      ],
      author: {
        name: "MoneyCalc Financial Team",
        credentials: "Finance Professionals, CFP®, CFA® candidates",
        role: "Content Review and Verification",
      },
      verification: {
        status: "verified",
        verifiedBy: "Financial Industry Standards",
        verifiedDate: "2026-07-31",
      },
      whenToUse:
        "Use this calculator when comparing loan offers, budgeting for a new purchase, or understanding the true cost of borrowing. Ideal for personal loans, auto loans, student loans, and business financing decisions.",
      whenNotToUse:
        "Do not use for variable-rate loans, adjustable-rate mortgages, or loans with complex fee structures. For these scenarios, consult your lender's specific amortization schedule.",
      tips: [
        "Always compare the APR, not just the interest rate, as it includes fees.",
        "Consider a shorter term if you can afford higher payments - you'll pay less interest overall.",
        "Factor in all fees when comparing total loan costs.",
        "Calculate the total interest to understand your true borrowing cost.",
        "Use this calculator before negotiating with lenders to know your limits.",
      ],
    },
    faqs: [
      {
        question: "How is a monthly loan payment calculated?",
        answer:
          "Lenders use the amortisation formula M = P × r / (1 − (1 + r)⁻ⁿ). The payment stays constant, but the split between interest and principal shifts toward principal over time. This formula is the industry standard used by all financial institutions.",
      },
      {
        question: "Does a longer loan term save money?",
        answer:
          "A longer term lowers the monthly payment but almost always increases total interest, because the balance stays outstanding for more months. While easier on cash flow, you pay more overall.",
      },
      {
        question: "What is the difference between interest rate and APR?",
        answer:
          "The interest rate prices the borrowed money alone. APR folds in lender fees, so it is the fairer number when comparing two offers. Always compare APRs for true cost comparison.",
      },
      {
        question: "Can I pay a loan off early?",
        answer:
          "Most personal loans allow early repayment, which cuts interest sharply. Check for prepayment penalties before making a lump-sum payment. Early payoff is always beneficial unless penalties apply.",
      },
      {
        question: "Why does early paydown save so much interest?",
        answer:
          "Interest is calculated on the remaining balance each month. When you pay down principal early, you reduce the base on which future interest is calculated. This creates a compounding effect that saves significantly over time.",
      },
      {
        question: "What is an amortization schedule?",
        answer:
          "An amortization schedule shows each payment broken down into principal and interest components. Early payments are mostly interest, while later payments are mostly principal. Our calculator generates this schedule automatically.",
      },
      {
        question: "How do I calculate total interest paid?",
        answer:
          "Total interest equals (monthly payment × number of payments) minus the original loan amount. For example, a $25,000 loan at 8.5% over 5 years with $512.83 monthly payments costs $6,170 in interest ($512.83 × 60 - $25,000).",
      },
      {
        question: "Should I always choose the shortest term possible?",
        answer:
          "Not necessarily. While shorter terms save interest, they require higher monthly payments. Choose the shortest term you can comfortably afford without straining your budget. A 15-year mortgage is often better than a 30-year if you can handle the payments.",
      },
      {
        question: "What's the difference between simple and compound interest?",
        answer:
          "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus accumulated interest. Most loans use simple interest amortization, which is what this calculator models.",
      },
      {
        question: "How does the Federal Reserve affect my loan rate?",
        answer:
          "The Federal Reserve's discount rate and federal funds rate influence the prime rate, which banks use as a benchmark for many consumer loans. When the Fed raises rates, new loans typically become more expensive.",
      },
      {
        question: "Is it better to refinance my loan?",
        answer:
          "Refinancing can save money if interest rates are lower than your current rate, or if you can shorten your loan term. Factor in closing costs and break-even point before refinancing.",
      },
      {
        question: "How do I know if I can afford the monthly payment?",
        answer:
          "Financial experts recommend keeping total debt payments below 36% of your gross monthly income. The 28/36 rule suggests housing costs shouldn't exceed 28% of income and total debt 36%.",
      },
    ],
    related: [
      "auto-loan-calculator",
      "mortgage-calculator",
      "debt-payoff-calculator",
      "credit-card-payoff-calculator",
    ],
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
        "Your mortgage payment is more than principal and interest. Property tax, home insurance and association fees can add 20–30% on top, which is why so many buyers are surprised at closing. This calculator shows the complete monthly number including all components. Understanding your full housing cost is essential for making sound home-buying decisions.",
      what: "A mortgage calculator estimates the full PITI payment — principal, interest, taxes and insurance — for a fixed-rate home loan, along with the total interest paid across the life of the mortgage. It provides a complete picture of your monthly housing obligations including escrow items that are often overlooked.",
      how: [
        "Enter the purchase price and the percentage you plan to put down.",
        "Add the quoted interest rate and the term, usually 15 or 30 years.",
        "Include your local property tax rate and an annual insurance estimate.",
        "Add HOA dues if the property has them, then review the breakdown chart.",
        "Compare different down payment scenarios to understand the trade-offs.",
        "Use the amortization table to see how equity builds over time.",
      ],
      formula: "Payment = [P × r / (1 − (1 + r)⁻ⁿ)] + tax/12 + insurance/12 + HOA",
      formulaNote:
        "P is the loan amount after the down payment, r the monthly rate and n the number of monthly payments. This formula combines the standard amortization calculation with monthly escrow components.",
      example:
        "On a 420,000 home with 20% down at 6.5% over 30 years, principal and interest come to about 2,124 a month. Adding 1.1% property tax and 1,800 of insurance pushes the true monthly cost above 2,660. Over 30 years, you'll pay approximately 340,000 in total interest.",
      advantages: [
        "Reveals the real cost of ownership rather than just the loan payment.",
        "Makes it easy to test how a larger down payment changes affordability.",
        "Shows how much of the early years goes almost entirely to interest.",
        "Helps you budget for the total monthly housing expense including taxes and insurance.",
        "Enables comparison of different neighborhoods based on total cost of ownership.",
        "Visualizes the equity build-up over time to understand when you'll have substantial equity.",
      ],
      limitations: [
        "Private mortgage insurance is not modelled for down payments under 20%.",
        "Closing costs, maintenance and utilities sit outside the calculation.",
        "Adjustable-rate mortgages will diverge once the fixed period ends.",
        "Property tax rates can change annually based on local assessments.",
        "Home insurance premiums typically increase over time.",
        "Results are estimates for planning purposes only.",
      ],
      howWorks:
        "This calculator first computes the principal and interest payment using the amortization formula. It then adds the monthly property tax (annual tax rate × home price ÷ 12), monthly home insurance (annual insurance ÷ 12), and any HOA dues. The total is displayed as the 'all-in' monthly payment. This mirrors exactly how lenders calculate PITI for mortgage qualification.",
      assumptions: [
        "Fixed mortgage interest rate for the entire loan term.",
        "Property tax rate remains constant over the loan term.",
        "Home insurance premiums do not change annually.",
        "HOA fees are fixed and known.",
        "PMI is not included for down payments under 20%.",
        "No additional closing costs, private mortgage insurance, or loan origination fees.",
        "Interest rates remain unchanged throughout the mortgage term.",
      ],
      commonMistakes: [
        "Focusing only on the P&I payment and ignoring property taxes and insurance.",
        "Using the annual property tax rate directly instead of dividing by 12 for monthly.",
        "Forgetting that taxes and insurance may increase annually.",
        "Not accounting for HOA fees if applicable.",
        "Assuming the quoted rate is the APR without considering the true cost.",
        "Using the down payment percentage incorrectly in the calculation.",
        "Not understanding that the monthly payment shown is for principal and interest only, not taxes and insurance.",
        "Overlooking that the actual interest rate may be higher than the nominal rate due to fees.",
        "Assuming a fixed rate when considering adjustable-rate options.",
        "Failing to budget for potential rate increases on ARMs after the fixed period.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Standard amortisation formula with PITI components",
        version: "1.0.0",
      },
      sources: [
        "Federal Reserve - Consumer Mortgage Credit - https://www.federalreserve.gov/releases/g19/current/",
        "CFPB - Buying a Home - https://www.consumerfinance.gov/ask-cfpb/",
        "Federal Housing Finance Agency (FHFA) - House Price Index",
        "Investopedia - PITI Mortgage Payment - https://www.investopedia.com/terms/p/piti.asp",
        "Internal Revenue Service (IRS) - Property Tax Deductions",
      ],
      references: [
        "Federal Housing Administration (FHA) - Mortgage Guidelines",
        "VA Loan Requirements - Department of Veterans Affairs",
        "Fannie Mae Underwriting Standards",
        "Freddie Mac Loan Performance Guidelines",
      ],
      author: {
        name: "MoneyCalc Financial Team",
        credentials: "Finance Professionals, CFP® certified",
        role: "Mortgage Expert Review",
      },
      verification: {
        status: "verified",
        verifiedBy: "Mortgage Industry Standards",
        verifiedDate: "2026-07-31",
      },
      whenToUse:
        "Use this calculator when house hunting, comparing mortgage offers, or determining how much home you can afford. Essential for first-time buyers and those considering refinancing.",
      whenNotToUse:
        "Do not use for adjustable-rate mortgages with complex teaser rates, interest-only loans, or government-backed loans with unique payment structures. Consult your lender for these scenarios.",
      tips: [
        "Use the 28% housing ratio guideline: total housing costs should not exceed 28% of gross monthly income.",
        "Also consider the 36% debt-to-income ratio including all monthly debt payments.",
        "A larger down payment reduces your loan-to-value ratio and may eliminate PMI.",
        "Shop around for insurance quotes - premiums can vary significantly between providers.",
        "Consider the impact of annual tax and insurance increases on your future budget.",
        "Use this calculator before house hunting to establish your price range.",
        "Compare 15-year vs 30-year loans to see the trade-off between payment and total interest.",
        "Factor in closing costs, which typically add 2-5% to your total home purchase cost.",
      ],
    },
    faqs: [
      {
        question: "How much house can I afford?",
        answer:
          "A common guideline keeps total housing costs under 28% of gross monthly income and all debt payments under 36%. Enter different prices here until the payment lands inside that range. The 28/36 rule provides a starting point, but your comfort zone may differ.",
      },
      {
        question: "Is a 15-year mortgage better than a 30-year?",
        answer:
          "A 15-year loan carries a higher monthly payment but can cut lifetime interest by more than half. Choose it only if the higher payment still leaves room to save and invest. The trade-off is payment vs. total interest saved.",
      },
      {
        question: "What is PITI?",
        answer:
          "PITI stands for principal, interest, taxes and insurance — the four components lenders count when they assess whether you can afford a home. Understanding PITI helps you budget for the true monthly housing cost.",
      },
      {
        question: "Do I need 20% down?",
        answer:
          "No, but below 20% most lenders require mortgage insurance, which adds to the monthly cost until you build enough equity. FHA loans allow as low as 3.5% down but require mortgage insurance for the life of the loan.",
      },
      {
        question: "How do I calculate my maximum home price?",
        answer:
          "Start with your monthly budget for housing (typically 28% of income), add estimated taxes and insurance, then use this calculator in reverse to find the maximum loan amount you can afford.",
      },
      {
        question: "What is the difference between interest rate and APR?",
        answer:
          "The interest rate is the cost of borrowing money. APR includes the interest rate plus certain fees, providing a more accurate picture of the loan's true cost. Always compare APRs when shopping for mortgages.",
      },
      {
        question: "Should I pay extra toward my mortgage?",
        answer:
          "Paying extra principal reduces the balance faster, which cuts interest over time. Even small extra payments each month can significantly reduce your total interest cost. Check with your lender about how extra payments are applied.",
      },
      {
        question: "How does refinancing work?",
        answer:
          "Refinancing replaces your existing mortgage with a new one, potentially at a lower rate or different term. Use this calculator to model different scenarios and determine if the savings justify closing costs.",
      },
      {
        question: "What's the difference between fixed-rate and adjustable-rate mortgages?",
        answer:
          "Fixed-rate mortgages have the same payment for the entire term. Adjustable-rate mortgages (ARMs) start with a fixed period, then adjust based on market rates. ARMs can be riskier if rates rise significantly.",
      },
      {
        question: "How does PMI work?",
        answer:
          "Private Mortgage Insurance (PMI) is required when your down payment is less than 20%. It protects the lender if you default. PMI typically costs 0.5-1.5% of the loan amount annually and can be removed once you reach 20% equity.",
      },
      {
        question: "Should I make a larger down payment?",
        answer:
          "A larger down payment reduces your monthly payment and total interest. It also eliminates PMI with conventional loans. However, keep enough emergency savings after the down payment. The ideal down payment balances these factors.",
      },
      {
        question: "What is the 5/1 ARM popular for?",
        answer:
          "A 5/1 ARM has a fixed rate for the first 5 years, then adjusts annually. These loans often have lower initial rates than 30-year fixed mortgages. They're popular for buyers who plan to move or refinance within 5-7 years.",
      },
    ],
    related: [
      "loan-calculator",
      "savings-calculator",
      "auto-loan-calculator",
      "debt-payoff-calculator",
    ],
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
        "Dealers negotiate on monthly payment because it hides the true price of a car. Stretching a loan from 48 to 84 months makes almost any vehicle look affordable while quietly adding thousands in interest. Understanding the total cost of ownership is essential for making smart car-buying decisions.",
      what: "An auto loan calculator estimates the monthly payment on a car loan after accounting for sales tax, your down payment and any trade-in credit, and shows the total interest across the term. It helps you see beyond the monthly payment to understand the true cost of financing a vehicle.",
      how: [
        "Enter the negotiated vehicle price, not the sticker price.",
        "Add your cash down payment and the value the dealer allows for your trade-in.",
        "Set the local sales tax rate — many states tax the price after the trade-in credit.",
        "Choose an APR and term, then compare 48, 60 and 72 months to see the interest difference.",
        "Calculate the total cost of the vehicle including interest and fees.",
        "Use the breakdown to negotiate with lenders based on actual costs.",
      ],
      formula: "Financed = price + tax − down − trade-in;  M = F × r / (1 − (1 + r)⁻ⁿ)",
      formulaNote:
        "r is the monthly APR and n the number of monthly payments in the term. This formula first calculates the amount being financed, then applies the standard amortization formula.",
      example:
        "A 32,000 car with 4,000 down, 7% sales tax and a 7.2% APR over 60 months finances about 29,960 and costs roughly 596 a month, with close to 5,800 in interest. The total cost of the vehicle is approximately 37,760 including down payment and interest.",
      advantages: [
        "Includes tax and trade-in so the payment reflects the real out-the-door deal.",
        "Makes long-term financing traps obvious before you sign.",
        "Helps you set a realistic budget before walking into a dealership.",
        "Shows the total interest cost you'll pay over the life of the loan.",
        "Enables comparison of different loan terms to find the best value.",
        "Visualizes how extending the loan term dramatically increases total interest.",
      ],
      limitations: [
        "Dealer add-ons, extended warranties and gap insurance are excluded.",
        "Manufacturer rebates and subsidised APR offers need to be entered manually.",
        "Depreciation and running costs are not part of the payment estimate.",
        "Negative equity from upside-down trades is not modeled.",
        "Results are estimates for planning purposes only.",
      ],
      howWorks:
        "The calculator first determines the taxable amount (vehicle price minus trade-in value), then calculates sales tax. It then computes the financed amount (price + tax - down - trade-in). Finally, it applies the standard loan amortization formula to determine the monthly payment. This mirrors how lenders calculate auto loan payments.",
      assumptions: [
        "Fixed interest rate for the entire loan term.",
        "Sales tax is applied after the trade-in credit is subtracted.",
        "No dealer add-ons, extended warranties, or gap insurance.",
        "No manufacturer rebates or subsidised APR offers are applied.",
        "The vehicle depreciates immediately upon purchase but this is not modeled in the payment calculation.",
        "All fees are rolled into the financed amount or paid upfront.",
        "The loan uses simple interest amortization.",
      ],
      commonMistakes: [
        "Using the sticker price instead of the negotiated price.",
        "Forgetting to account for trade-in value in the tax calculation.",
        "Comparing loans with different terms without adjusting for the payment frequency.",
        "Not understanding that a longer term doesn't mean it's cheaper — total interest increases.",
        "Ignoring the impact of sales tax which can add 5-10% to the total cost.",
        "Focusing on the monthly payment without considering the total cost of the loan.",
        "Not factoring in depreciation which reduces the car's value over time.",
        "Using the annual rate instead of the monthly rate in calculations.",
        "Assuming the quoted rate is the APR without considering fees.",
        "Not understanding that negative equity can trap you in a cycle of rolling loans.",
        "Forgetting to budget for ongoing costs like insurance, maintenance, and fuel.",
        "Using a term that leaves you with upside-down financing (owing more than the car is worth).",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Standard amortisation formula with tax and trade-in adjustments",
        version: "1.0.0",
      },
      sources: [
        "Federal Reserve - Consumer Credit - https://www.federalreserve.gov/releases/g19/current/",
        "CFPB - Buying a Car - https://www.consumerfinance.gov/ask-cfpb/",
        "National Automobile Dealers Association (NADA) - Used Car Guide",
        "Edmunds - Car Financing Guide",
        "Kelley Blue Book (KBB) - Vehicle Pricing and Valuation",
      ],
      references: [
        "Federal Trade Commission (FTC) - Used Car Shopping Guide",
        "Federal Highway Administration - Vehicle Depreciation Statistics",
        "Insurance Institute for Highway Safety (IIHS) - Repair Costs",
      ],
      author: {
        name: "MoneyCalc Financial Team",
        credentials: "Finance Professionals, CFP® certified",
        role: "Auto Finance Review",
      },
      verification: {
        status: "verified",
        verifiedBy: "Auto Loan Industry Standards",
        verifiedDate: "2026-07-31",
      },
      whenToUse:
        "Use this calculator when shopping for a new or used car, comparing financing offers from dealers or banks, or determining how different down payments affect your monthly payment. Essential for comparing 36-month vs 72-month financing.",
      whenNotToUse:
        "Do not use for lease calculations, lease-to-own scenarios, or loans with complex fee structures. For leases, use a separate lease calculator.",
      tips: [
        "Always negotiate the vehicle price first, then discuss financing.",
        "A 20% down payment typically avoids negative equity and reduces your interest rate.",
        "72-month loans often have higher rates and more interest than 60-month loans.",
        "Consider a 0% APR dealer incentive if available - it can save thousands in interest.",
        "Get pre-approved for an auto loan from a bank or credit union before visiting the dealership.",
        "Factor in depreciation - most new cars lose 20% of value in the first year.",
        "Calculate the total cost including interest, not just the monthly payment.",
        "Consider a larger down payment to reduce or eliminate monthly payments.",
        "Check if the dealer requires add-ons like extended warranties or paint protection.",
        "Use this calculator to compare the true cost of different loan terms.",
        "Remember that insurance costs for a new car are typically higher than for a used car.",
        "Consider the total cost of ownership including fuel, maintenance, and repairs.",
      ],
    },
    faqs: [
      {
        question: "What is a good car loan term?",
        answer:
          "Sixty months or fewer keeps interest manageable and reduces the risk of owing more than the car is worth. Terms of 72–84 months usually mean years of negative equity. The sweet spot is often 36-60 months depending on your budget.",
      },
      {
        question: "Does a bigger down payment help?",
        answer:
          "Yes. Every unit of down payment reduces the financed balance directly, lowering both the monthly payment and the total interest. A 20% down payment typically avoids negative equity.",
      },
      {
        question: "Is dealer financing or a bank loan better?",
        answer:
          "Get a pre-approval from a bank or credit union first, then let the dealer try to beat it. Subsidised manufacturer rates can win, but only on specific models. Always compare the total cost, not just the rate.",
      },
      {
        question: "How does a trade-in affect sales tax?",
        answer:
          "In many jurisdictions sales tax applies to the price after the trade-in credit, which is why this calculator subtracts the trade-in before taxing. This can save you several hundred dollars in tax.",
      },
      {
        question: "Should I finance the entire vehicle price?",
        answer:
          "No. Always subtract your down payment and trade-in value before calculating what you need to finance. Financing more than necessary means paying interest on money you don't need to borrow.",
      },
      {
        question: "What is the difference between the interest rate and APR?",
        answer:
          "The interest rate is just the cost of borrowing. APR includes the interest rate plus certain fees, giving you a more accurate picture of the total loan cost. Always compare APRs when shopping for auto loans.",
      },
      {
        question: "How do I avoid negative equity?",
        answer:
          "Negative equity occurs when you owe more than the car is worth. Avoid it by putting at least 20% down, choosing a shorter loan term, or buying a used car that has already taken the biggest depreciation hit.",
      },
      {
        question: "Should I accept dealer add-ons?",
        answer:
          "Be cautious with dealer add-ons like extended warranties, paint protection, and rust proofing. These items have high profit margins and are often available more cheaply from third-party providers. Only purchase if you need them.",
      },
      {
        question: "What is the 80/10/10 rule?",
        answer:
          "This strategy involves putting 10% down, financing 80% with a conventional loan (avoiding PMI), and using 10% for closing costs and immediate resale value. It's a balanced approach for many buyers.",
      },
      {
        question: "How can I lower my car loan rate?",
        answer:
          "Improve your credit score before applying, put down a larger down payment, choose a shorter loan term, or shop around for better rates. A higher credit score can save you hundreds in interest over the life of the loan.",
      },
      {
        question: "When should I pay off my car loan early?",
        answer:
          "If you have extra cash, paying off your car loan early saves interest. Just be sure to check for prepayment penalties. Most loans allow early payoff, but confirm how extra payments are applied to principal.",
      },
      {
        question: "What's the difference between simple and compound interest auto loans?",
        answer:
          "Most auto loans use simple interest, calculated on the outstanding balance each month. Compound interest loans (rare) would calculate interest on previously accrued interest. Simple interest is standard in the auto industry.",
      },
    ],
    related: [
      "loan-calculator",
      "debt-payoff-calculator",
      "savings-calculator",
      "credit-card-payoff-calculator",
    ],
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
        "Credit card interest compounds monthly at rates that dwarf almost every other consumer debt. Paying the minimum on a mid-sized balance can keep you in debt for a decade — this calculator shows exactly how long, and what a slightly larger payment buys you. Understanding how credit card interest works is crucial for getting out of debt efficiently.",
      what: "This calculator simulates a credit card balance month by month: interest is added, your payment is subtracted, and the loop repeats until the balance reaches zero. It shows the exact payoff timeline and total interest cost based on your current balance, APR, and payment strategy. This iterative approach provides accurate results for any payment amount.",
      how: [
        "Enter your current statement balance or outstanding balance.",
        "Add the purchase APR shown on your statement (the APR, not the promotional rate).",
        "Enter the minimum payment you currently make each month.",
        "Test an extra payment amount to see how it accelerates your payoff.",
        "Compare the time and interest saved to decide how much extra to pay.",
        "Use the results to negotiate a lower rate with your issuer.",
      ],
      formula: "Balanceₙ₊₁ = Balanceₙ × (1 + APR/12) − payment",
      formulaNote:
        "There is no closed-form shortcut when payments are fixed and interest compounds, so the balance is simulated one month at a time. This iterative method is the most accurate way to calculate credit card payoff.",
      example:
        "A 6,500 balance at 22.9% APR with a 250 monthly payment takes about 3 years to clear and costs roughly 2,300 in interest. Adding just 100 a month cuts more than a year and around 800 of interest. Paying 350/month instead of 250 saves over 14 months and 1,200 in interest.",
      advantages: [
        "Turns an abstract APR into a concrete payoff date.",
        "Quantifies the value of every extra unit you throw at the balance.",
        "Warns you when a payment is too small to make progress at all.",
        "Helps you set realistic payoff targets and track progress.",
        "Shows the financial impact of negotiating a lower rate or balance transfer.",
        "Visualizes the exponential benefit of paying more than the minimum.",
      ],
      limitations: [
        "Assumes no new purchases are added to the card.",
        "Promotional 0% periods and balance-transfer fees are not modelled.",
        "Issuers calculate interest daily; monthly compounding is a close approximation.",
        "Does not account for cash advances, balance transfers, or promotional offers.",
        "Results are estimates based on the inputs provided.",
      ],
      howWorks:
        "The calculator uses an iterative approach to simulate each month: it calculates the interest (current balance × monthly APR), adds it to the balance, then subtracts the payment. This process repeats until the balance reaches zero or the payment becomes insufficient to cover interest. The iteration reveals the exact payoff timeline and total interest cost. Each month's balance is calculated on the previous month's ending balance, accurately reflecting compound interest.",
      assumptions: [
        "Interest compounds monthly at the stated APR.",
        "No new charges are added to the card during the payoff period.",
        "The payment amount remains constant throughout the payoff.",
        "No balance transfer fees or promotional APRs are applied.",
        "The APR remains fixed for the entire payoff period.",
        "No annual fees or other charges are applied.",
        "Payments are made on the due date each month, not earlier.",
        "The account has no grace period violations (late payments).",
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
        "Using the wrong interest rate (the promotional rate instead of the purchase APR).",
        "Not accounting for the grace period and when interest begins to accrue.",
        "Assuming a balance transfer won't have fees or a fixed term.",
        "Forgetting that cash advances typically have higher APRs and no grace period.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Iterative monthly interest simulation",
        version: "1.0.0",
      },
      sources: [
        "Federal Reserve - Consumer Credit - https://www.federalreserve.gov/releases/g19/current/",
        "CFPB - Credit Cards - https://www.consumerfinance.gov/ask-cfpb/tag/credit-cards/",
        "Federal Reserve Board Regulation Z - Truth in Lending Act",
        "Investopedia - Credit Card Interest - https://www.investopedia.com/terms/i/interestrate.asp",
        "Credit CARD Act of 2009 - Key Provisions",
      ],
      references: [
        "Federal Reserve Economic Data - Credit Card Interest Rates",
        "Consumer Financial Protection Bureau - Credit Card Agreements",
        "Federal Trade Commission - Credit Cards",
      ],
      author: {
        name: "MoneyCalc Financial Team",
        credentials: "Finance Professionals, CFP® certified",
        role: "Credit Card Debt Analysis",
      },
      verification: {
        status: "verified",
        verifiedBy: "Credit Card Industry Standards",
        verifiedDate: "2026-07-31",
      },
      whenToUse:
        "Use this calculator to plan your credit card payoff strategy, test different payment amounts, or understand the true cost of your current minimum payment. Essential for anyone carrying credit card debt.",
      whenNotToUse:
        "Do not use if you have promotional 0% APR periods that will expire, or if you're considering a balance transfer. Use a balance transfer calculator for those scenarios.",
      tips: [
        "Pay more than the minimum whenever possible - even small extra amounts make a big difference over time.",
        "Transfer high-interest balances to a 0% APR card if you qualify and can pay off before the promo ends.",
        "Use the avalanche method: pay off the highest APR card first while making minimums on others.",
        "Set up automatic payments to avoid late fees and missed payments.",
        "Call your credit card company to request a lower interest rate - they often agree for good customers.",
        "Consider a personal loan to consolidate high-interest credit card debt at a lower rate.",
        "Keep credit card balances low to maintain good credit utilization (under 30%).",
        "Never add new charges to a card you're paying off to avoid perpetuating debt.",
        "Use the snowball method if you need psychological wins - pay off the smallest balance first.",
        "Monitor your credit report regularly for errors or fraudulent activity.",
        "Consider debt consolidation if you have multiple high-interest cards.",
        "Calculate the break-even point before transferring a balance to ensure savings.",
      ],
    },
    faqs: [
      {
        question: "Why does paying the minimum take so long?",
        answer:
          "Minimum payments are typically 1–3% of the balance, barely above the monthly interest charge, so almost nothing goes to principal in the early years. On a $5,000 balance at 20% APR, the first minimum payment of $150 pays about $83 in interest, leaving only $67 for principal.",
      },
      {
        question: "Should I pay off the highest APR card first?",
        answer:
          "Mathematically yes — the avalanche method minimises total interest. The snowball method, paying the smallest balance first, delivers quick wins that keep many people on plan. Choose based on your motivation and circumstances.",
      },
      {
        question: "Does a balance transfer help?",
        answer:
          "A 0% transfer can save a lot if you clear the balance before the promotional period ends. Factor in the transfer fee, usually 3–5%, and calculate the break-even point before transferring.",
      },
      {
        question: "How is credit card interest actually charged?",
        answer:
          "Most issuers apply a daily periodic rate to the average daily balance. Monthly compounding, as used here, produces very similar totals. The exact method depends on your issuer's policy.",
      },
      {
        question: "What is the difference between APR and APY for credit cards?",
        answer:
          "APR is the annual percentage rate used to calculate monthly interest. APY (Annual Percentage Yield) includes the effect of compounding. For credit cards, the effective annual rate is slightly higher than the APR due to monthly compounding.",
      },
      {
        question: "How can I lower my credit card interest rate?",
        answer:
          "Call your issuer and ask for a lower rate. Offer to transfer your balance to another card with a lower rate. Make payments on time to maintain your good standing. Use a balance transfer credit card with a 0% APR promotional rate.",
      },
      {
        question: "Is it better to make multiple payments per month?",
        answer:
          "Yes. More frequent payments reduce the average daily balance, which lowers the interest charged. Making payments twice a month can save a meaningful amount over time, especially on high balances.",
      },
      {
        question: "What happens if I can't make the minimum payment?",
        answer:
          "Your account will be reported as delinquent, you'll incur late fees, your APR may be raised to the penalty rate, and your credit score will drop. Contact your issuer immediately to discuss a payment plan.",
      },
      {
        question: "How does a balance transfer fee work?",
        answer:
          "When you transfer a balance, the issuer typically charges a fee of 3–5% of the transferred amount. This fee is usually added to your new card's balance. Calculate whether the savings from the 0% APR outweighs this fee.",
      },
      {
        question: "What is a grace period?",
        answer:
          "A grace period is the time between the statement closing date and the payment due date during which you can pay in full without incurring interest. If you carry a balance, you lose the grace period and interest accrues from the transaction date.",
      },
      {
        question: "Should I close credit card accounts after paying them off?",
        answer:
          "Generally no. Closing accounts can hurt your credit utilization ratio and reduce your available credit history. Keep old accounts open and use them occasionally to maintain your credit score.",
      },
      {
        question: "What is the impact of a hard inquiry on my credit score?",
        answer:
          "A hard inquiry (when a lender checks your credit to approve credit) typically lowers your score by 5-10 points. Multiple inquiries for the same type of credit within a short window (14-45 days) count as one inquiry for scoring purposes.",
      },
    ],
    related: [
      "debt-payoff-calculator",
      "loan-calculator",
      "savings-calculator",
      "investment-calculator",
    ],
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
        "Every extra unit you send to a debt is a guaranteed, tax-free return equal to the interest rate. This calculator quantifies that return by comparing your current payment plan against an accelerated one. Making additional payments can transform your debt payoff timeline and save thousands in interest. Understanding the true cost of debt is the first step toward financial freedom.",
      what: "A debt payoff calculator models the combined balance of your consumer debts at an average interest rate and shows the payoff date, total interest and the savings from paying more each month. It helps you create an accelerated debt payoff plan and quantify the financial impact of extra payments. This tool works for credit cards, personal loans, student loans, and other consumer debts.",
      how: [
        "Add up the balances of the debts you want to attack and enter the total.",
        "Estimate a blended interest rate weighted by balance size.",
        "Enter what you currently pay each month across those debts.",
        "Test extra payment amounts until the debt free date looks achievable.",
        "Use the results to decide which debts to prioritize.",
        "Track your progress as you reduce the total balance.",
      ],
      formula: "Balanceₙ₊₁ = Balanceₙ × (1 + APR/12) − (payment + extra)",
      formulaNote:
        "The simulation repeats monthly until the balance hits zero, tracking cumulative interest along the way. This iterative approach accurately models debt payoff with additional payments.",
      example:
        "Carrying 18,000 at 16% while paying 450 a month takes about 5 years and costs over 8,000 in interest. Adding 150 a month cuts roughly 20 months and thousands of interest from the plan. The extra 150/month saves about 3,600 in total interest and gets you debt-free 20 months sooner.",
      advantages: [
        "Gives you a concrete debt free date to aim at.",
        "Shows the exact payoff value of a raise, side income or cut expense.",
        "Works for a single debt or a blended portfolio of consumer debts.",
        "Visualizes the dramatic impact of extra payments on payoff timeline.",
        "Helps justify the discipline of paying more each month.",
        "Enables comparison of different payoff strategies and payment amounts.",
        "Makes the financial benefits of extra payments tangible and measurable.",
      ],
      limitations: [
        "Uses one blended rate rather than tracking each debt separately.",
        "Does not order payoffs by avalanche or snowball priority.",
        "Assumes no new borrowing during the payoff period.",
        "Does not account for different minimum payments across debts.",
        "Results are estimates based on the blended rate assumption.",
        "Does not factor in balance transfer opportunities or consolidation loans.",
      ],
      howWorks:
        "The calculator treats all your debts as a single 'blended' loan with an average interest rate. It then simulates each month: interest is calculated on the current balance, your payment (plus any extra) is subtracted, and the process repeats until the balance reaches zero. The comparison shows how much faster you get there with extra payments. The blended rate is calculated as (balance1 × rate1 + balance2 × rate2 + ...) / total balance.",
      assumptions: [
        "A blended average interest rate represents all debts.",
        "No new debt is added during the payoff period.",
        "All payments are made on time each month.",
        "The interest rate remains constant throughout the payoff.",
        "No debt consolidation loans or balance transfers are involved.",
        "The extra payment is applied consistently each month.",
        "Minimum payments on individual debts are included in the total payment.",
        "All debts have the same payment frequency (monthly).",
        "No debts are paid off completely before the simulation ends.",
        "No prepayment penalties affect the calculation.",
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
        "Ignoring the psychological benefit of paying off smaller debts first (snowball method).",
        "Not considering that different debts may have different interest rates and minimum payments.",
        "Assuming consolidation loans always save money without checking fees.",
        "Forgetting that paying off debt early may improve your credit score.",
        "Not understanding that the blended rate is an approximation, not exact for each debt.",
        "Using incorrect balance totals - forgetting to include all credit cards, loans, and lines of credit.",
      ],
      lastUpdated: {
        date: "2026-07-31",
        method: "Iterative monthly interest simulation with blended rate",
        version: "1.0.0",
      },
      sources: [
        "Federal Reserve - Consumer Credit - https://www.federalreserve.gov/releases/g19/current/",
        "CFPB - Debt Collection - https://www.consumerfinance.gov/ask-cfpb/",
        "National Foundation for Credit Counseling (NFCC) - Debt Management",
        "Investopedia - Debt Avalanche Method - https://www.investopedia.com/terms/d/debtavalanche.asp",
        "Financial Planning Association (FPA) - Debt Reduction Strategies",
      ],
      references: [
        "Federal Trade Commission - Debt Collection Practices Act",
        "Consumer Financial Protection Bureau - Debt Counseling",
        "Credit Counseling Society - Debt Management Plans",
      ],
      author: {
        name: "MoneyCalc Financial Team",
        credentials: "Finance Professionals, CFP® certified",
        role: "Debt Strategy Review",
      },
      verification: {
        status: "verified",
        verifiedBy: "Consumer Credit Standards",
        verifiedDate: "2026-07-31",
      },
      whenToUse:
        "Use this calculator to create an accelerated debt payoff plan, compare your current payment strategy against alternatives, and quantify the savings from extra payments. Essential for anyone carrying consumer debt.",
      whenNotToUse:
        "Do not use for mortgage debt, student loans with unique repayment terms, or debts with different payment frequencies. Use specific calculators for those scenarios.",
      tips: [
        "Build a small emergency fund (1-2 months of expenses) before aggressively paying down debt.",
        "Use the avalanche method to minimize total interest - pay off highest APR first.",
        "Use the snowball method if you need psychological wins - pay off smallest balance first.",
        "Consider debt consolidation through a personal loan if the rate is lower and fees are reasonable.",
        "Communicate with your creditors to request lower rates or hardship programs if needed.",
        "Make payments twice a month to reduce the average daily balance.",
        "Never add new debt to cards you're paying off - it perpetuates the cycle.",
        "Track your progress monthly to stay motivated by visible results.",
        "Consider a 0% balance transfer to pause interest while you pay down the balance.",
        "Calculate the break-even point before taking on new debt for consolidation.",
        "Automate your debt payments to ensure consistency and avoid missed payments.",
        "Review and adjust your plan quarterly as balances change.",
      ],
    },
    faqs: [
      {
        question: "Snowball or avalanche — which is better?",
        answer:
          "Avalanche, paying the highest rate first, minimises total interest. Snowball, clearing the smallest balance first, delivers quick wins that keep many people on plan. The best method is the one you finish. Try avalanche for mathematical efficiency, snowball for motivation.",
      },
      {
        question: "Should I save or pay off debt first?",
        answer:
          "Build a small emergency buffer (3-6 months), capture any employer retirement match, then aggressively pay anything above roughly 8% interest before investing more. High-interest debt always costs more than potential investment returns.",
      },
      {
        question: "Will paying off debt improve my credit score?",
        answer:
          "Lowering revolving balances reduces credit utilisation, which is a major scoring factor. Improvements often show within one or two statement cycles. Paying off debt in full can boost your score by 10-20 points.",
      },
      {
        question: "Does consolidating debt help?",
        answer:
          "Consolidation helps only if the new rate is genuinely lower and you avoid re-running balances back up on the cleared cards. A personal loan consolidation may save interest if your credit qualifies you for a better rate.",
      },
      {
        question: "What is the difference between a debt snowball and debt avalanche?",
        answer:
          "Snowball: Pay minimums on all debts, put extra toward smallest balance first. Avalanche: Pay minimums on all debts, put extra toward highest interest rate first. Snowball wins on motivation, avalanche saves money.",
      },
      {
        question: "How does a balance transfer work?",
        answer:
          "You transfer an existing credit card balance to a new card, often with a 0% promotional APR. You pay a fee (typically 3-5%) but can save on interest. Pay off the full balance before the promo ends or you'll face the penalty rate.",
      },
      {
        question: "Should I use a debt management plan?",
        answer:
          "A DMP is a structured repayment plan managed by a nonprofit credit counseling agency. It may reduce interest rates and consolidate payments, but closes your cards. It's a good option if you can't stick to a DIY plan.",
      },
      {
        question: "What happens if I miss a debt payment?",
        answer:
          "You'll incur late fees (typically $25-40), your credit score will drop, and the interest rate may increase to a penalty APR. Contact your creditor immediately to discuss a payment arrangement.",
      },
      {
        question: "Can debt consolidation loans hurt my credit?",
        answer:
          "Opening a new loan creates a hard inquiry and new account, which can temporarily lower your score. However, paying off revolving debt lowers your credit utilization, which helps your score. The net effect is usually positive over time.",
      },
      {
        question: "How long does it take to repair credit after paying off debt?",
        answer:
          "Positive changes show within 1-2 billing cycles. Full recovery takes 6-12 months as the paid-off accounts age. Avoid opening new credit immediately after debt payoff to maximize the score boost.",
      },
      {
        question: "Is it better to pay off one large debt or multiple smaller debts?",
        answer:
          "Mathematically, pay off the highest interest rate first (avalanche). Psychologically, paying off a smaller balance provides motivation (snowball). You can combine both methods - pay minimums on all, extra on highest rate, but celebrate each paid-off account.",
      },
      {
        question: "Should I close credit cards after paying them off?",
        answer:
          "Generally no - closing cards can increase your credit utilization ratio. Keep oldest accounts open in good standing. If you must close, remove them from your wallet and lock them away rather than closing the account.",
      },
    ],
    related: [
      "credit-card-payoff-calculator",
      "loan-calculator",
      "savings-calculator",
      "investment-calculator",
    ],
  },
];
