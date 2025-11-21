# 🎥 YouTube Transcript Summarizer

A powerful, full-stack web application that generates concise, AI-powered summaries from YouTube videos. Built with the MERN stack (MongoDB, Express, React, Node.js) and powered by Google's Gemini AI.

![Project Banner](https://via.placeholder.com/1200x600?text=YouTube+Transcript+Summarizer)

---

## 🚀 Features

### 🎨 Frontend (React + Vite)
- **Modern UI/UX**: Built with Tailwind CSS, ShadCN UI, and Glassmorphism effects.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.
- **Custom Video Player**: Embeds the YouTube video for easy reference.
- **Markdown Rendering**: Displays summaries with rich formatting (bold, lists, headers).
- **SEO Optimized**: Dynamic meta tags, sitemap, and canonical links using `react-helmet-async`.
- **Multi-language Support**: Request summaries in English, Hindi, Marathi, Spanish, French, and German.

### ⚙️ Backend (Node.js + Express)
- **Transcript Extraction**: Fetches captions directly from YouTube (no browser automation needed).
- **AI Summarization**: Uses Google Gemini 1.5 Flash for fast, accurate summaries.
- **Robust API**: RESTful endpoints with error handling and validation.
- **Secure**: Environment-based configuration.

---

## 🛠 Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, ShadCN UI, Axios, React Router, React Helmet Async |
| **Backend** | Node.js, Express.js, Google Gemini AI, Youtube-Transcript.io API |
| **Tools** | Git, NPM, Postman |

---

## 📂 Project Structure

```
yt-summarizer/
├── backend/                # Node.js API Server
│   ├── controllers/        # Logic for handling requests
│   ├── routes/             # API Routes
│   ├── utils/              # Helper functions (transcript fetcher)
│   └── index.js            # Entry point
│
├── yt-summarizer/          # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer)
│   │   ├── pages/          # Page views (Home, Result)
│   │   └── assets/         # Static assets
│   └── vite.config.js      # Vite configuration
│
└── README.md               # This file
```

---

## 🏁 Quick Start

### Prerequisites
- Node.js (v16+)
- NPM or Yarn
- API Keys for [Google Gemini](https://aistudio.google.com/) and [YouTube Transcript IO](https://youtube-transcript.io/)

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
PORT=4000
YT_TRANSCRIPT_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```
Run the server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd yt-summarizer
npm install
```
Create a `.env` file in `yt-summarizer/`:
```env
VITE_BASE_URL=/yt-summarizer
VITE_API_URL=http://localhost:4000
```
Run the development server:
```bash
npm run dev
```

Visit `http://localhost:5173/yt-summarizer` to see the app!

---

## 📬 Contact

**Vishwanath Hatti**  
- 🌐 Portfolio: [vhatti.online](https://www.vhatti.online)
- 💼 LinkedIn: [vishwanath-hatti](https://www.linkedin.com/in/vishwanath-hatti)
- 📧 Email: vhatti14@gmail.com
