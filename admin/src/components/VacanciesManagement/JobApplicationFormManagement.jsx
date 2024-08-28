import React, { useState, useEffect } from 'react';
import './JobApplicationFormManagement.css'; // Stil dosyanızı ekleyin

// İş başvurularını almak için API çağrısı yapan fonksiyon
const fetchJobApplications = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/vacancies');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching job applications:', error);
    throw error;
  }
};

// İş başvurusunu silmek için API çağrısı yapan fonksiyon
const deleteJobApplication = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/vacancies/${id}`, {
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
              <p><strong>Date of Birth:</strong> {app.dateOfBirth}</p>
              <p><strong>Additional Notes:</strong> {app.additionalNotes}</p>
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
