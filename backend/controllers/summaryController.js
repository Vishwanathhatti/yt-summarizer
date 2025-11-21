import axios from "axios";
import extractVideoId from "../utils/extractVideoId.js";
import { fetchTranscript } from "../utils/fetchTranscript.js";

export const summarizeVideo = async (req, res) => {
  try {
    const { youtubeUrl, language } = req.body;

    if (!youtubeUrl) return res.status(400).json({ error: "youtubeUrl required" });
    if (!language) return res.status(400).json({ error: "language required" });

    const videoId = extractVideoId(youtubeUrl);

    if (!videoId)
      return res.status(400).json({ error: "Invalid YouTube URL" });

    const transcript = await fetchTranscript(videoId);

    if (!transcript)
      return res.status(404).json({ error: "Transcript not found" });

    const prompt = `
    Summarize the following YouTube transcript in ${language}.
    Use bullet points. Make it readable.

    Transcript:
    ${transcript}
    `;

    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const summary =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Unable to generate summary.";

    return res.json({ summary, success:true });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error);
    res.status(500).json({ error: "Server error", success:false });
  }
};
