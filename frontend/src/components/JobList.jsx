import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs, loading, error, handleRemove, handleEdit }) => {
  return (
    <div className="homepageContainer">
      {loading && <div className="loadingSpinner"></div>}{" "}
      {/* Show spinner while loading */}
      {error && <p className="error">{error}</p>}
      {!loading && !error && jobs.length === 0 && <p>No jobs available.</p>}
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default JobList;
