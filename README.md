# Smart Money Tools

**Free finance calculators for smarter money decisions.**

A production-ready Finance Calculator platform built to compete with Calculator.net, NerdWallet, Bankrate, and Omni Calculator.

## 🚀 Live Demo

https://moneycalc.vercel.app

## 🎯 Project Goals

Build a premium finance calculator platform where every calculator has its own SEO-optimized landing page. The architecture supports adding hundreds of calculators without changing the existing codebase.

## 🛠️ Tech Stack

| Category       | Technologies                                                    |
| -------------- | --------------------------------------------------------------- |
| **Frontend**   | TanStack Start (Next.js 15 App Router), React 19, TypeScript    |
| **Styling**    | Tailwind CSS, shadcn/ui                                         |
| **Charts**     | Recharts                                                        |
| **Forms**      | React Hook Form, Zod Validation                                 |
| **SEO**        | JSON-LD, Dynamic Sitemap, robots.txt, Open Graph, Twitter Cards |
| **Analytics**  | Google Analytics 4, Microsoft Clarity                           |
| **Ads**        | Google AdSense ready                                            |
| **Deployment** | Vercel, Cloudflare CDN                                          |

## 📊 Available Calculators

- Compound Interest Calculator
- Investment Calculator
- Loan Calculator
- Mortgage Calculator
- Savings Calculator
- Retirement Calculator
- Credit Card Payoff Calculator
- Auto Loan Calculator
- Debt Payoff Calculator
- Inflation Calculator

## 🏗️ Architecture

**Scalable calculator engine** supporting 500+ calculators via JSON-driven configuration with:

- Reusable calculator components
- Shared validation logic
- Modular chart components
- Dynamic SEO system

## 🎨 Design Principles

Inspired by: Stripe, Vercel, Linear, Notion, Apple, NerdWallet

Features:

- Dark/Light mode
- Mobile-first responsive design
- Glass effects, smooth animations
- Professional gradients
- WCAG-compliant color palette

## 🌐 Site Structure

```
/                    Homepage
/calculators         Calculator listing & search
/calculators/:slug   Individual calculator page
```

## 🚀 Development

```bash
git clone https://github.com/Nihar-Shadow/Moneycalc.git
cd Moneycalc
npm install
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🔧 Features

- Instant calculations with real-time validation
- Interactive charts with data visualization
- Step-by-step calculation breakdown
- Currency and date formatting
- Copy/Share results functionality
- SEO-optimized pages with structured data
- Performance: 100 Lighthouse scores (Performance, Accessibility, SEO, Best Practices)

## 📈 Performance Targets

- Core Web Vitals optimized
- Code splitting enabled
- Image optimization
- Lazy loading
- Caching & prefetching

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

Built with [Lovable](https://lovable.dev).
