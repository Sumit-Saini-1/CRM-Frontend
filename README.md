# CRM-Frontend

A modern customer/product management dashboard built using **React**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**. This app supports secure login, protected routing, product listing with pagination, detailed product views, and full CRUD operations — all powered by the DummyJSON API.

---

## 🚀 Features

- 🔐 **Login Authentication** using token-based auth (DummyJSON API)
- 🔁 **Public and Private Routing**
- 📊 **Dashboard** with sample graph integration
- 📦 **Product Management**
  - List products with pagination
  - View product details
  - Add, Edit, Delete products
- 🌐 **Global State Management** using Redux Toolkit
- 🎨 **Styled with Tailwind CSS**

---

## 🧪 Tech Stack

- **React** (with Vite)
- **TypeScript**
- **Redux Toolkit**
- **React Router DOM v6**
- **Tailwind CSS**
- **DummyJSON API** ([Docs](https://dummyjson.com/docs))

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Sumit-Saini-1/CRM-Frontend.git
cd CRM-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

---

## 🔐 DummyJSON Credentials for Login

Use these credentials to login:

```
username: emilys
password: emilyspass
```

You can explore more login credentials at: https://dummyjson.com/docs/auth

---

## 📁 Folder Structure

```
src/
├── components/       # Reusable components (Input, Button, Layout, etc.)
├── store/         # Redux slices and logic
├── lib/              # API helper functions
├── pages/            # Route-based pages (Login, Dashboard, Products, etc.)
├── routes/           # Route config with Private/Public route guards
├── types/            # TypeScript interfaces and types
├── App.tsx           # Main app file
└── main.tsx          # Entry point
```

## 📦 API Reference

All API requests are made to [DummyJSON](https://dummyjson.com/) — a free fake REST API for testing and prototyping.

---

## 🙌 Author

**Sumit Saini**  
[GitHub](https://github.com/Sumit-Saini-1)  
[LinkedIn](https://www.linkedin.com/in/sumit-saini-771313244)

---