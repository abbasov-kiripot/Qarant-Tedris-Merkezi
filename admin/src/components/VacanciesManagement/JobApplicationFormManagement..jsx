import React, { useState, useEffect } from 'react';
import './JobApplicationFormManagement.css';
import { FaEye } from "react-icons/fa";

const fetchJobApplications = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/jobApplications');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching job applications:', error);
    throw error;
  }
};

const deleteJobApplication = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/jobApplications/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error deleting job application:', error);
    throw error;
  }
};

const JobApplicationFormManagement = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJobApplications = async () => {
      try {
        const data = await fetchJobApplications();
        setJobApplications(data);
      } catch (err) {
        setError('Error fetching job applications.');
      } finally {
        setLoading(false);
      }
    };

    getJobApplications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteJobApplication(id);
      setJobApplications(jobApplications.filter(app => app._id !== id));
    } catch (err) {
      setError('Error deleting job application.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="job-application-form-management">
      <h1>Job Applications Management</h1>
      <div className="application-list">
        {jobApplications.length > 0 ? (
          jobApplications.map(app => (
            <div key={app._id} className="application-item">
              <h3>{app.firstName} {app.lastName}</h3>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>Date of Birth:</strong> {new Date(app.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Additional Notes:</strong> {app.additionalNotes}</p>
              <p>
                <strong>CV:</strong>
                {app.cv ? (
                  <a href={app.cv} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '5px' }}>
                  <FaEye className="eye-icon" title="View CV" />
                </a>
                ) : (
                  <span>No CV Uploaded</span>
                )}
              </p>
              <button className="delete-btn" onClick={() => handleDelete(app._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No applications available.</p>
        )}
      </div>
    </div>
  );
};

export default JobApplicationFormManagement;
