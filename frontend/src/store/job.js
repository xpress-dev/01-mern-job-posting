import { create } from "zustand";

export const useJobStore = create((set) => ({
  jobs: [],
  loading: false,
  error: null,
  setJobs: (jobs) => set({ jobs }),

  // Helper function for field validation
  validateJobFields: (newJob) => {
    if (
      !newJob.company ||
      !newJob.name ||
      !newJob.pay ||
      !newJob.description ||
      !newJob.postingImageUrl
    ) {
      return { success: false, message: "Please fill in all fields." };
    }
    return { success: true };
  },

  // Create a job with enhanced error handling
  createJob: async (newJob) => {
    const validation = useJobStore.getState().validateJobFields(newJob);
    if (!validation.success) {
      return validation;
    }

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(newJob),
      });
      const data = await res.json();

      if (!data.success || !data.data) {
        return { success: false, message: "Failed to create job." };
      }

      set((state) => ({ jobs: [...state.jobs, data.data] }));
      return { success: true, message: "Job created successfully." };
    } catch (error) {
      console.error("Error creating job:", error);
      return {
        success: false,
        message: "An error occurred while creating the job.",
      };
    }
  },

  // Fetch jobs with error handling
  fetchJobs: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();

      if (!data.success || !data.data) {
        throw new Error("Failed to fetch jobs.");
      }

      set({ jobs: data.data });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      set({ error: "Failed to fetch jobs." });
    } finally {
      set({ loading: false });
    }
  },

  deleteJob: async (jid) => {
    try {
      const res = await fetch(`/api/jobs/${jid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // After successful deletion, filter the job out of the state.
      set((state) => ({
        jobs: state.jobs.filter((job) => job._id !== jid), // Ensure the job is removed from the state
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting job:", error);
      return {
        success: false,
        message: "An error occurred while deleting the job.",
      };
    }
  },

  // Update a job with error handling
  updateJob: async (jid, updatedJob) => {
    try {
      const res = await fetch(`/api/jobs/${jid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(updatedJob),
      });
      const data = await res.json();

      if (!data.success || !data.data) {
        return {
          success: false,
          message: data.message || "Failed to update job.",
        };
      }

      set((state) => ({
        jobs: state.jobs.map((job) => (job._id === jid ? data.data : job)),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating job:", error);
      return {
        success: false,
        message: "An error occurred while updating the job.",
      };
    }
  },
}));
