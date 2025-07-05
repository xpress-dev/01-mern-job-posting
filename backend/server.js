import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import jobRoutes from "./routes/job.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/jobs", jobRoutes);

// Serve frontend static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDist));
// Catch-all: serve React app for any non-API route
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is listening on port ${PORT}`);
});
