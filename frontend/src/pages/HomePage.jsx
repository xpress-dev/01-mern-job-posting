// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useJobStore } from "../store/job.js";
import JobList from "../components/JobList";
import EditModal from "../components/EditModal";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const HomePage = () => {
  // Get the jobs and store actions from Zustand
  const { jobs, fetchJobs, deleteJob, updateJob, loading, error } =
    useJobStore();

  // State for editing a job
  const [editJob, setEditJob] = useState(null);

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleRemove = async (jobId) => {
    const result = await deleteJob(jobId);
    if (result.success) {
      toast.success("Job removed successfully");
    } else {
      toast.error(result.message);
    }
    fetchJobs(); // Re-fetch jobs after deletion
  };

  const handleEdit = (job) => {
    setEditJob(job);
  };

  const handleUpdateJob = async (updatedJob) => {
    const result = await updateJob(updatedJob._id, updatedJob);
    if (result.success) {
      toast.success("Job updated successfully");
    } else {
      toast.error(result.message);
    }
    setEditJob(null); // Close the modal
  };

  return (
    <div className="homepage">
      {loading && <Spinner />} {/* Show the spinner if loading */}
      <JobList
        jobs={jobs}
        loading={loading}
        error={error}
        handleRemove={handleRemove}
        handleEdit={handleEdit}
      />
      {/* Show the Edit Modal if editJob is set */}
      {editJob && (
        <EditModal
          editJob={editJob}
          setEditJob={setEditJob}
          handleUpdateJob={handleUpdateJob}
        />
      )}
    </div>
  );
};

export default HomePage;
