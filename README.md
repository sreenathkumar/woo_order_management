# Order Management

**A Next.js app to streamline WooCommerce/Shopify order assignment, payment tracking, and driver reporting.**

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Overview

Order Management helps store owners and delivery teams manage WooCommerce/Shopify processing orders more efficiently.  
Admins can assign orders to drivers, drivers can easily track and update payment statuses, and reports can be generated for payouts.

This project reduces manual steps in WooCommerce/Shopify while keeping data secure and simple for drivers in the field.

---

## ✨ Key Features

- **Order Assignment**

  - Assign WooCommerce/Shopify orders directly to drivers (bulk or individual).
  - View and clear driver order lists.

- **Driver Interface**

  - See only assigned orders.
  - Update orders with statuses: Cash Paid, Link Paid, Prepaid (Delivered), Unpaid, or Notes.
  - Orders displayed in a clear layout with all details visible at a glance.
  - Filter and search by city, phone, or order number.
  - Copy list as plain text for sharing (WhatsApp, notepad, etc.).

- **Admin & Store Clerk**

  - Create and manage user accounts (Admin only).
  - Assign/remove orders for drivers.
  - Generate payment reports by driver and date.

- **Reports**
  - Totals per driver (e.g. “Cash: $100, Link: $25”).
  - Export as plain text for easy sharing.
  - Planned: detailed date-wise delivery history for payout tracking.

---

## 🛠️ Tech Stack

- **Frontend/Backend**: Next.js (TypeScript, App Router)
- **Styling**: Tailwind CSS, Shadcn UI
- **Database**: MongoDB (via `dbConnect.ts`)
- **Auth**: Custom role-based authentication
- **Package Manager**: pnpm

---

## 📂 Project Structure

```bash
woo_order_management/
├── .github/            # GitHub workflows for CI/CD
│   └── workflows/      # GitHub Actions workflow files
├── actions/            # Next.js server actions
├── app/                # Next.js App Router pages and route handlers
├── components/         # Reusable UI components
├── context/            # React Context providers (auth, orders, etc.)
├── docs/               # Documentation files(.md) for the repo.
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API integrations
├── models/             # MongoDB/Mongoose models
├── public/             # Static assets like images, icons, fonts
├── styles/             # Global styles, Tailwind overrides
├── types/              # TypeScript type definitions
├── .env.example        # Example environment variables
├── .eslintrc.json      # ESLint configuration
├── .gitattributes      # Git attributes configuration
├── .gitignore          # Files/folders to ignore in Git
├── README.md           # Central documentation
├── auth.config.ts      # Authentication configuration (providers, secrets)
├── auth.ts             # Main authentication logic / handler
├── components.json     # Component library configuration (shadcn/ui)
├── dbConnect.ts        # MongoDB connection utility
├── middleware.ts       # Next.js middleware (auth checks, redirects)
├── next.config.ts      # Next.js custom configuration
├── package.json        # Project dependencies, scripts, metadata
├── pnpm-lock.yaml      # pnpm lockfile for deterministic installs
├── postcss.config.mjs  # PostCSS configuration (Tailwind plugins)
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript compiler options

```

---

## ⚡ Quick Start

1. Clone the repo:
   ```
   git clone https://github.com/sreenathkumar/woo_order_management.git
   cd woo_order_management
   ```
2. Install dependencies:
   ```
   pnpm install
   ```
3. This project requires a `.env` file. Copy `.env.example` → .`env` and configure your environment variables. See [Environment Variables](./docs/ENVIRONMENT.md) for a full list and details about the environment variables.
4. Run locally:
   `pnpm dev`
5. Open http://localhost:3000

---

## 📖 Documentation

- [Environment Variables](./docs/ENVIRONMENT.md)
- [API Endpoints](./docs/API.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Components Guide](./docs/COMPONENTS.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Roadmap](./docs/ROADMAP.md)

---

## 🤝 Contributing

Contributions are welcome!  
Please check out [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.
