# 💳 VaultPay - Digital Wallet System Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux" alt="Redux Toolkit">
  <img src="https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
</p>

> **A secure, role-based, and user-friendly frontend application for the VaultPay Digital Wallet System, built with React, Redux Toolkit, and TypeScript.**

---

## 🚀 Live Demo

- **Frontend Live URL:** [https://vaultpay-iota.vercel.app](https://vaultpay-iota.vercel.app)
- **Backend Live URL:** [https://digital-wallet-system-server.vercel.app](https://digital-wallet-system-server.vercel.app)

---

## 📖 Table of Contents
* [Overview](#-overview)
* [Project Structure](#️-project-structure)
* [Key Features](#-key-features)
* [Core Technologies](#️-core-technologies)
* [Key Dependencies](#-key-dependencies)
* [Setup and Installation](#️-setup-and-installation)
* [Environment Variables](#-environment-variables)
* [Testing Credentials](#-test-account-credentials)

---

## 📝 Overview

This project is the complete frontend for the **VaultPay Digital Wallet System**. It provides a polished and intuitive user interface for three distinct roles: **Users**, **Agents**, and **Admins**. Built as a Single Page Application (SPA) using React and Vite, it leverages Redux Toolkit and RTK Query for robust state management and efficient data fetching from the backend API.

The application features a public-facing landing site, secure authentication, and dedicated dashboards tailored to the functionalities of each role.

---

## 🏗️ Project Structure

The project follows a modular, feature-first architecture to ensure a clean and scalable codebase.

```
src/
├── pages/
│   ├── common/         # Public pages (Home, About, Login, etc.)
│   ├── admin/          # Pages for the Admin dashboard
│   └── userAndagent/   # Pages shared by User and Agent dashboards
├── components/
│   ├── Modules/        # Large, feature-specific components (e.g., forms, layout sections)
│   └── ui/             # Reusable, generic UI components (Button, Card, etc. from shadcn/ui)
├── redux/
│   ├── features/       # Redux slices and RTK Query API definitions
│   ├── hook.ts         # Typed Redux hooks
│   └── store.ts        # Redux store configuration
├── routes/             # React Router configuration and sidebar item definitions
├── contexts/           # React Context providers (e.g., ThemeContext)
├── hooks/              # Custom hooks (e.g., useTheme, useIsMobile)
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

---

## ✨ Key Features

### 👤 **User Features**
*   **Guided Tour:** A welcoming step-by-step tour of the dashboard for new users.
*   **Profile Management:** Update personal info, password, and PIN.
*   **Send Money:** Instantly send money to any other registered user.
*   **Add & Withdraw Money:** Add money to or withdraw money from their own wallet.
*   **Transaction History:** View a paginated and filterable list of all past transactions.
*   **Become an Agent:** Users can request to have their account upgraded to an `AGENT` account.

### 👨‍💼 **Agent Features**
*   **Add & Withdraw Money:** Add money to or withdraw money from their own wallet.
*   **Cash-In:** Add money to a user's wallet upon receiving cash from them.
*   **Cash-Out Facilitation:** Act as the destination for user-initiated cash-out requests.
*   **Wallet & History:** View their own wallet balance and transaction history.
*   **Profile Management:** Manage personal and account information.

### 👑 **Admin Features**
*   **Statistical Dashboard:** View system-wide statistics with dynamic charts for users and transactions.
*   **Agent Management:** Approve or reject pending agent requests and manage existing agents.
*   **User Management:** View all users and wallets, with the ability to block or unblock any user.
*   **System-Wide Transactions:** Access a complete, filterable, and paginated log of all system transactions.

---

## 🛠️ Core Technologies

This project leverages a modern and powerful frontend stack to ensure a high-quality user experience.

| Technology | Purpose |
| :--- | :--- |
| **React & Vite** | UI Library & Build Tool | For a fast, modern, and efficient development experience with Hot Module Replacement (HMR). |
| **TypeScript** | Language | Ensures code quality and type safety, crucial for a financial application. |
| **Redux Toolkit & RTK Query** | State Management | Provides a robust, centralized state management solution and simplifies data fetching, caching, and API interaction. |
| **React Router** | Routing | Handles all client-side routing and enables features like lazy loading for pages. |
| **Tailwind CSS & shadcn/ui** | Styling & UI Components | Creates a beautiful, responsive, and consistent design system with utility-first classes and accessible components. |
| **Driver.js** | Guided Tour | Powers the interactive, step-by-step guided tour for new users. |

---

## 📦 Key Dependencies

A look at the major libraries that power this application.

| Package | Description |
| :--- | :--- |
| `@reduxjs/toolkit` | The official, opinionated, batteries-included toolset for efficient Redux development. |
| `react-router` | For declarative routing in the React application. |
| `tailwindcss` | A utility-first CSS framework for rapid UI development. |
| `shadcn/ui` | A collection of beautifully designed, accessible, and reusable components. |
| `recharts` | A composable charting library built on React components, used for the admin dashboard. |
| `axios` | For making HTTP requests to the backend API, with interceptors for handling token refreshes. |
| `react-hook-form` & `zod` | For powerful, type-safe form creation and validation. |
| `sonner` | For elegant and simple toast notifications. |
| `driver.js` | For creating the user-friendly guided tour. |

---

## ⚙️ Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Redoan-Hasan/Digital-Wallet-System-Frontend.git
    cd Digital-Wallet-System-Frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root of the project and add the required environment variables (see below).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## 🔑 Environment Variables

Create a `.env` file in the project root and add the following variable. This URL should point to the running instance of your backend server.

```env
# The base URL for the backend API
VITE_BASE_URL=http://localhost:5000/api/v1
```

---

## 🔑 Test Account Credentials

> **IMPORTANT:** Use these credentials to access the various roles for testing.

### 👑 Admin Account
*   **Email:** `admin@gmail.com`  
*   **Password:** `admin123`

### 👨‍💼 Agent Account
*   **Email:** `redoanagent@gmail.com`
*   **Password:** `123456`

### 👤 User Account
*   **Email:** `redoan@gmail.com`
*   **Password:** `123456`