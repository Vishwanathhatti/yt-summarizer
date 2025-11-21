# 💻 YouTube Summarizer - Frontend

The frontend client for the YouTube Transcript Summarizer, built with React, Vite, and Tailwind CSS. It provides a beautiful, responsive interface for users to generate and view video summaries.

---

## ✨ Key Features

- **Glassmorphism UI**: A modern, sleek design using backdrop filters and gradients.
- **Responsive Navbar**: Includes a mobile-friendly hamburger menu.
- **Custom Language Selector**: A searchable dropdown to choose summary languages.
- **Markdown Support**: Renders AI-generated summaries with proper HTML formatting.
- **SEO Ready**: Fully optimized with `react-helmet-async` for meta tags and open graph data.
- **Configurable**: Uses environment variables for API endpoints and base paths.

---

## 🛠 Dependencies

- **Core**: `react`, `react-dom`, `react-router-dom`
- **Build Tool**: `vite`
- **Styling**: `tailwindcss`, `clsx`, `tailwind-merge`, `lucide-react`
- **UI Components**: `@radix-ui` primitives (via ShadCN UI)
- **Utilities**: `axios`, `react-markdown`, `react-helmet-async`

---

## 🚀 Setup & Installation

1.  **Navigate to the directory**:
    ```bash
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root of the frontend directory:
    ```env
    VITE_BASE_URL="/yt-summarizer"      # Base path for routing
    VITE_API_URL="http://localhost:4000" # Backend API URL
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  **Build for Production**:
    ```bash
    npm run build
    ```

---

## 📂 Key Components

- **`pages/Home.jsx`**: The landing page with the URL input form, features, and FAQs.
- **`pages/Result.jsx`**: Displays the YouTube video embed and the generated summary.
- **`components/Navbar.jsx`**: Responsive navigation bar.
- **`components/ui/*`**: Reusable UI components (Buttons, Inputs, Cards).

---

## 🎨 Styling

This project uses **Tailwind CSS** for styling.
- **Typography**: `@tailwindcss/typography` plugin is used for prose styling in summaries.
- **Animations**: `tailwindcss-animate` and custom keyframes in `index.css`.
