// src/components/EditModal.jsx
import React, { useEffect, useRef } from "react";

const EditModal = ({ editJob, setEditJob, handleUpdateJob }) => {
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
            const updatedJob = {
              ...editJob,
              name: e.target.name.value,
              pay: e.target.pay.value,
              description: e.target.description.value,
              company: e.target.company.value,
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
