import React, { useState } from 'react';
import './Vacancies.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    additionalNotes: '',
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cv: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('fatherName', formData.fatherName);
    formDataToSend.append('dateOfBirth', formData.dateOfBirth);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('additionalNotes', formData.additionalNotes);
    if (formData.cv) {
      formDataToSend.append('cv', formData.cv);
    }

    try {
      const response = await fetch('http://localhost:8080/api/JobApplications', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      // Optional: Clear form after submission
      setFormData({
        firstName: '',
        lastName: '',
        fatherName: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        additionalNotes: '',
        cv: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="application-form">
      <h1>Job Application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Father's Name *</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Upload CV</label>
          <input
            type="file"
            name="cv"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
