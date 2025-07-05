// src/components/EditModal.jsx
import React, { useEffect, useRef, useState } from "react";

const DEFAULT_IMAGE_URL =
  "https://www.insperity.com/wp-content/uploads/how-to-write-a-job-posting-1200x630-1.png";

const EditModal = ({ editJob, setEditJob, handleUpdateJob }) => {
  // State for conditional image input
  const [showImageInput, setShowImageInput] = useState(
    !!editJob.postingImageUrl && editJob.postingImageUrl !== DEFAULT_IMAGE_URL
  );
  const [imageUrl, setImageUrl] = useState(
    editJob.postingImageUrl && editJob.postingImageUrl !== DEFAULT_IMAGE_URL
      ? editJob.postingImageUrl
      : ""
  );
  useEffect(() => {
    // Disable scrolling on mount
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Track if mousedown started on backdrop
  const mouseDownOnBackdrop = useRef(false);

  const handleBackdropMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      mouseDownOnBackdrop.current = true;
    } else {
      mouseDownOnBackdrop.current = false;
    }
  };

  const handleBackdropMouseUp = (e) => {
    if (mouseDownOnBackdrop.current && e.target === e.currentTarget) {
      setEditJob(null);
    }
    mouseDownOnBackdrop.current = false;
  };

  return (
    <div
      className="editModal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseDown={handleBackdropMouseDown}
      onMouseUp={handleBackdropMouseUp}
    >
      <div
        className="editModal"
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          minWidth: 320,
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      >
        <h3>Edit Job</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let postingImageUrl = imageUrl;
            if (!showImageInput || !postingImageUrl.trim()) {
              postingImageUrl = DEFAULT_IMAGE_URL;
            }
            const updatedJob = {
              ...editJob,
              name: e.target.name.value,
              pay: e.target.pay.value,
              description: e.target.description.value,
              company: e.target.company.value,
              postingImageUrl,
            };
            handleUpdateJob(updatedJob);
          }}
        >
          <input
            type="text"
            name="company"
            defaultValue={editJob.company}
            placeholder="Company"
          />
          <input
            type="text"
            name="name"
            defaultValue={editJob.name}
            placeholder="Job Name"
          />
          <input
            type="number"
            name="pay"
            defaultValue={editJob.pay}
            placeholder="Pay"
          />
          <textarea
            name="description"
            defaultValue={editJob.description}
            placeholder="Description"
          />
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>
              <input
                type="checkbox"
                checked={showImageInput}
                onChange={(e) => {
                  setShowImageInput(e.target.checked);
                  if (!e.target.checked) setImageUrl("");
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
              <label htmlFor="edit-postingImageUrl">Posting Image URL</label>
              <input
                type="url"
                id="edit-postingImageUrl"
                name="postingImageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                style={{ borderColor: "#6366f1" }}
              />
            </div>
          )}

          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditJob(null)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
