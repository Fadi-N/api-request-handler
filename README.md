# 🌐 Custom Fetch with Retry in TypeScript

This project provides a robust, flexible wrapper around the native `fetch` function with built-in retry logic, delay, and full TypeScript support. It's designed to be production-ready and simple to integrate.

---

## 📦 Setup

```bash
# Clone the repo
git clone https://github.com/Fadi-N/api-request-handler.git

# Install required dev dependencies
npm install
```

---

## 📁 Project Structure

```
project/
├── src/
│   ├── request.ts       # Request function with retry
│   └── test.ts          # Example usage/test
├── package.json
└── tsconfig.json
```
---

## ▶️ Run the Example

With `ts-node`:
```bash
npx ts-node src/test.ts
```