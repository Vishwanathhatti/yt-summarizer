# ⚙️ YouTube Summarizer - Backend

A robust Node.js + Express API that powers the YouTube Transcript Summarizer. It handles transcript extraction and interfaces with Google's Gemini AI to generate summaries.

---

## 🚀 Features

- **Transcript Extraction**: Uses `youtube-transcript.io` to fetch captions from standard videos and Shorts.
- **AI Summarization**: Leverages **Google Gemini 1.5 Flash** for high-quality, context-aware summaries.
- **Multilingual Support**: Can translate and summarize content into multiple languages.
- **Error Handling**: Gracefully handles missing captions, invalid URLs, and API limits.
- **CORS Enabled**: Configured to work seamlessly with the React frontend.

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Model**: Google Gemini 1.5 Flash
- **HTTP Client**: Axios
- **Utilities**: `dotenv`, `cors`

---

## 🚀 Setup & Installation

1.  **Navigate to the directory**:
    ```bash
    cd backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root of the backend directory:
    ```env
    PORT=4000
    YT_TRANSCRIPT_API_KEY=your_youtube_transcript_api_key
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Run Server**:
    - **Development**: `npm run dev` (uses nodemon)
    - **Production**: `npm start`

---

## 📡 API Endpoints

### `POST /api/summarize`

Generates a summary for a given YouTube video.

**Request Body:**
```json
{
  "youtubeUrl": "https://www.youtube.com/watch?v=...",
  "language": "en"
}
```

**Response:**
```json
{
  "summary": "## Key Takeaways\n\n* Point 1...\n* Point 2...",
  "videoUrl": "https://www.youtube.com/watch?v=..."
}
```

---

## 🔐 Security

- **Environment Variables**: API keys are stored in `.env` and never committed.
- **Input Validation**: Basic validation ensures URLs are valid YouTube links.

---

## 👤 Author

**Vishwanath Hatti**
- 🌐 [vhatti.online](https://www.vhatti.online)
- 💼 [LinkedIn](https://www.linkedin.com/in/vishwanath-hatti)
