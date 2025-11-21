import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summaryRoutes from "./routes/summaryRoutes.js";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());

app.use("/api", summaryRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
