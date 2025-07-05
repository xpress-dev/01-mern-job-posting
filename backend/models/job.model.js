import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pay: {
      type: Number,
      required: true,
    },
    postingImageUrl: {
      type: String,
      required: false,
      default:
        "https://www.insperity.com/wp-content/uploads/how-to-write-a-job-posting-1200x630-1.png",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
