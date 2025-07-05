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

  // Generic input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    for (const key in form) {
      if (!form[key].trim()) {
        toast.error("Please fill in all fields before submitting.");
        return;
      }
    }

    // Prepare the job data object
    const newJob = { ...form };

    // Call the Zustand store's createJob function
    const result = await createJob(newJob);

    if (result.success) {
      toast.success(result.message);
      navigate("/"); // Redirect to the homepage after successful creation
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
          <label htmlFor="pay">Salary</label>
          <input
            type="text"
            id="pay"
            name="pay"
            value={form.pay}
            onChange={handleInputChange}
            placeholder="Enter salary"
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

        <div className="form-group">
          <label htmlFor="postingImageUrl">Posting Image URL</label>
          <input
            type="url"
            id="postingImageUrl"
            name="postingImageUrl"
            value={form.postingImageUrl}
            onChange={handleInputChange}
            placeholder="Enter image URL"
          />
        </div>

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreatePage;
