// src/App.js
import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="Contact">
      <header className="Contact-header">
        <span className='AH-1'> CONTACT US </span>
      </header>
      <form className="contact-form">
        <label>
        Name and Surname*
          <input type="text" name="name" placeholder="Name and Surname" required />
        </label>
        <label>
        Service *
          <select name="service" required>
            <option value="" disabled selected>Select a service</option>
            <option value="service1">Service 1</option>
            <option value="service2">Service 2</option>
            <option value="service3">Service 3</option>
          </select>
        </label>
        <label>
          phone *
          <input type="tel" name="phone" placeholder="phone" required />
        </label>
        <label>
        E-mail*
          <input type="email" name="email" placeholder="E-mail" required />
        </label>
        <label>
        Your message *
          <textarea name="message" placeholder="Your message" required></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
      <div className="map-container">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.1485472432326!2d-74.00594118467784!3d40.71277597932945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDAnNDInNDQuMCJOIDc0wrAwMCcyNC4yIlc!5e0!3m2!1sen!2s!4v1624904164953!5m2!1sen!2s"
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
