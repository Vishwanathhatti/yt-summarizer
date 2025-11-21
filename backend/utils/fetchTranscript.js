import axios from "axios";

export const fetchTranscript = async (videoId) => {
  try {
    const response = await axios.post(
      "https://www.youtube-transcript.io/api/transcripts",
      { ids: [videoId] },
      {
        headers: {
          Authorization: `Basic ${process.env.YT_TRANSCRIPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const items = response.data;

    if (!items || items.length === 0) {
      console.log("❌ No transcript items found");
      return null;
    }

    const item = items[0];

    // Prefer clean transcript
    if (item.text && item.text.length > 0) {
      return item.text;
    }

    // Otherwise fallback to tracks
    if (item.tracks?.length > 0) {
      const track = item.tracks[0];

      const combined = track.transcript
        .map((segment) => segment.text)
        .join(" ");

      return combined;
    }

    console.log("❌ No transcript available in text or tracks");
    return null;

  } catch (error) {
    console.error("Transcript API Error:", error.response?.data || error);
    return null;
  }
};
