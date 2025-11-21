import express from "express";
import { summarizeVideo } from "../controllers/summaryController.js";

const router = express.Router();

router.post("/summarize", summarizeVideo);

export default router;
