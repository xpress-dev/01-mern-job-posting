import mongoose from "mongoose";
import Job from "../models/job.model.js";

export const createJob = async (req, res) => {
  const job = req.body;
  if (
    !job.company ||
    !job.name ||
    !job.pay ||
    !job.description ||
    !job.postingImageUrl
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields." });
  }
  try {
    const newJob = await Job.create(job);
    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    console.error(`Error creating a job: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error(`Error fetching jobs: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const job = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Job ID." });
  }

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, job, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    console.error(`Error updating the job: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Job ID." });
  }

  try {
    await Job.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: false, message: "Job removed successfully." });
  } catch (error) {
    console.error(`Error deleting the job: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
