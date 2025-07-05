// src/components/JobCard.jsx
import React from "react";

const JobCard = ({ job, handleRemove, handleEdit }) => {
  return (
    <article>
      <div className="imageContainer">
        <img src={job.postingImageUrl} alt={job.name} />
      </div>
      <span>{job.company}</span>
      <span>{job.name}</span>
      <span>${job.pay} per year</span>
      <p>{job.description}</p>

      {/* Edit and Remove Buttons */}
      <div className="buttonContainer">
        <button className="editButton" onClick={() => handleEdit(job)}>
          Edit
        </button>
        <button className="removeButton" onClick={() => handleRemove(job._id)}>
          Remove
        </button>
      </div>
    </article>
  );
};

export default JobCard;
