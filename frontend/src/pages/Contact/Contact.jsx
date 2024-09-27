// src/Contact.js
import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({
          name: '',
          service: '',
          phone: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus('Error sending message');
      console.error(error);
    }
  };

  return (
    <div className="Contact">
      <header className="Contact-header">
        <span className='AH-1'> CONTACT US </span>
      </header>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name and Surname*
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name and Surname"
            required
          />
        </label>
        <label>
          Service *
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a service</option>
            <option value="service1">Service 1</option>
            <option value="service2">Service 2</option>
            <option value="service3">Service 3</option>
          </select>
        </label>
        <label>
          Phone *
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
        </label>
        <label>
          E-mail*
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            required
          />
        </label>
        <label>
          Your message *
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            required
          ></textarea>
        </label>
        <button type="submit">Send</button>
        {status && <p>{status}</p>}
      </form>
      <div className="map-container">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9008.323712099676!2d50.09334948311802!3d40.448236528442315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030610002e54c89%3A0x16d2da375b1e5edd!2zSMmZZMmZZiBLaXRhYiBFdmk!5e0!3m2!1str!2saz!4v1725663975334!5m2!1str!2saz"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
