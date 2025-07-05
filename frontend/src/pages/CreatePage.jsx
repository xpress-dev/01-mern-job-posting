// src/pages/CreatePage.jsx

import React, { useState } from "react";
import { useJobStore } from "../store/job.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  // Use the Zustand store for job creation
  const { createJob } = useJobStore();
  const navigate = useNavigate(); // for redirecting after successful job creation

  // Improved: single state object for all form fields
  const [form, setForm] = useState({
    company: "",
    name: "",
    pay: "",
    description: "",
    postingImageUrl: "",
  });
  const [showImageInput, setShowImageInput] = useState(false);

  // Generic input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validators
  const validators = {
    company: (v) => v.trim().length >= 2,
    name: (v) => v.trim().length >= 2,
    pay: (v) => /^\d{4,8}$/.test(v.trim()), // 4-7 digit number
    description: (v) => v.trim().length >= 10,
    postingImageUrl: (v) => {
      if (!showImageInput) return true; // skip validation if not shown
      if (!v.trim()) return false;
      try {
        const url = new URL(v.trim());
        return /^(http|https):/.test(url.protocol);
      } catch {
        return false;
      }
    },
  };

  const getErrorMessage = (field) => {
    switch (field) {
      case "company":
        return "Company name must be at least 2 characters.";
      case "name":
        return "Job title must be at least 2 characters.";
      case "pay":
        return "Salary per year must be a valid number (at least 4 digits).";
      case "description":
        return "Description must be at least 10 characters.";
      case "postingImageUrl":
        return "Please enter a valid image URL (http/https) or leave blank.";
      default:
        return "Please fill in all fields correctly.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in form) {
      if (!validators[key](form[key])) {
        toast.error(getErrorMessage(key));
        return;
      }
    }

    // If postingImageUrl is empty or not shown, use default
    const newJob = { ...form };
    if (!showImageInput || !newJob.postingImageUrl.trim()) {
      newJob.postingImageUrl =
        "https://www.insperity.com/wp-content/uploads/how-to-write-a-job-posting-1200x630-1.png";
    }
    const result = await createJob(newJob);
    if (result.success) {
      toast.success(result.message);
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="create-page">
      <h1>Create a New Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={form.company}
            onChange={handleInputChange}
            placeholder="Enter company name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Job Title</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Enter job title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pay">Salary per year in USD</label>
          <input
            type="number"
            id="pay"
            name="pay"
            value={form.pay}
            onChange={handleInputChange}
            placeholder="Enter salary per year (e.g. 50000)"
            min="1000"
            step="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Enter job description"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={showImageInput}
              onChange={(e) => {
                setShowImageInput(e.target.checked);
                if (!e.target.checked)
                  setForm((f) => ({ ...f, postingImageUrl: "" }));
              }}
              style={{
                width: 18,
                height: 18,
                accentColor: "#6366f1",
                marginRight: 8,
              }}
            />
            I have an image for the job posting.
          </label>
        </div>

        {showImageInput && (
          <div className="form-group">
            <label htmlFor="postingImageUrl">Posting Image URL</label>
            <input
              type="url"
              id="postingImageUrl"
              name="postingImageUrl"
              value={form.postingImageUrl}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              style={{ borderColor: "#6366f1" }}
            />
          </div>
        )}

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreatePage;
