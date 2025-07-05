import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import jobRoutes from "./routes/job.route.js";
import authRoutes from "./routes/auth.route.js";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);

// Serve frontend static files

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is listening on port ${PORT}`);
});
