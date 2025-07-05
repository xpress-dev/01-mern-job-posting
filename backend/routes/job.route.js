import express from "express";

import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from "../controllers/job.controller.js";
import authMiddleware from "../middleware/auth.mjs";

const router = express.Router();

router.post("/", authMiddleware, createJob);

router.get("/", getJobs);

router.put("/:id", authMiddleware, updateJob);

router.delete("/:id", authMiddleware, deleteJob);

export default router;
