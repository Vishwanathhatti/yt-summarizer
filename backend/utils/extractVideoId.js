const extractVideoId = (url) => {
  try {
    if (url.includes("v=")) return url.split("v=")[1].split("&")[0];
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];
    if (url.includes("/shorts/")) return url.split("/shorts/")[1].split("?")[0];
    return null;
  } catch {
    return null;
  }
};

export default extractVideoId;
