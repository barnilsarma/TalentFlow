import styles from "./Jobs.module.scss";
import { useState, useEffect } from "react";
import * as components from "../../components";
import axios from "axios";

const Jobs = () => {
  const { Jobs } = components;
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    mode: "",
    experience: "",
    location: "",
    description: "",
    technologies: "",
    status: "Open",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await axios.get("/api/jobs");
    if (res.status === 200) {
      setJobs(res.data.jobs);
      setLoading(false);
    }
  };

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = "Job name is required";
    if (!formData.type) errs.type = "Job type is required";
    if (!formData.mode) errs.mode = "Job mode is required";
    if (!formData.experience) errs.experience = "Experience is required";
    if (!formData.location) errs.location = "Location is required";
    if (!formData.description) errs.description = "Description is required";
    if (!formData.technologies) errs.technologies = "Technologies are required";
    return errs;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newJob = {
      ...formData,
      id: jobs.length + 1,
      technologies: formData.technologies.split(",").map((t) => t.trim()),
    };

    // Add to MirageJS server
    await axios.post("/api/jobs", newJob);

    // Update local state
    setJobs((prev) => [...prev, newJob]);
    setShowModal(false);
    setFormData({
      name: "",
      type: "",
      mode: "",
      experience: "",
      location: "",
      description: "",
      technologies: "",
      status: "Open",
    });
    setErrors({});
  };

  return (
    <div className={styles.Jobs}>
      <h1>Jobs</h1>
      <button className={styles.addJobButton} onClick={() => setShowModal(true)}>
        Add Job
      </button>

      <div className={styles.midBar}>
        <input
          type="text"
          placeholder="Search by keywords"
          className={styles.searchBar}
        />
        <div className={styles.filterContainer}>
          <span>Filter by:</span>
          <select className={styles.filter}>
            <option value="all" className={styles.option}>
              All
            </option>
            <option value="type" className={styles.option}>
              Job Type
            </option>
            <option value="mode" className={styles.option}>
              Job Mode
            </option>
            <option value="exp" className={styles.option}>
              Experience
            </option>
          </select>
        </div>
      </div>

      {loading && <h1>Loading Jobs....</h1>}

      <div className={styles.container}>
        {currentJobs.map((job) => (
          <div className={styles.jobCardParent} key={job.id}>
            <Jobs.Card
              id={job.id}
              name={job.name}
              type={job.type}
              mode={job.mode}
              exp={job.experience}
              status={job.status}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? styles.activePage : ""}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Add Job Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Add Job</h2>
            <form onSubmit={handleSubmit}>
              {[
                "name",
                "type",
                "mode",
                "experience",
                "location",
                "description",
                "technologies",
              ].map((field) => (
                <div key={field} className={styles.formGroup}>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                  {errors[field] && (
                    <span className={styles.error}>{errors[field]}</span>
                  )}
                </div>
              ))}
              <div className={styles.formGroup}>
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className={styles.formActions}>
                <button type="submit">Add</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
