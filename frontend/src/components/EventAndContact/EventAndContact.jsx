import React, { useState, useEffect } from 'react';
import './EventAndContact.css';

// Etkinlikleri almak için API çağrısı yapan fonksiyon
const fetchEvents = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/events');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Başvuru verilerini gönderen API çağrısı yapan fonksiyon
const submitApplication = async (data) => {
  try {
    const response = await fetch('http://localhost:8080/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 'contact/json' yerine 'application/json'
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

const EventAndContact = () => {
  const [events, setEvents] = useState([]); // Etkinlikleri saklamak için state
  const [formData, setFormData] = useState({ // Başvuru form verilerini saklamak için state
    name: '',
    service: '',
    phone: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState(null); // Hata durumlarını saklamak için state

  // Etkinlikleri yüklemek için useEffect
  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError('Error fetching events.');
      }
    };
    getEvents();
  }, []);

  // Form verilerini güncelleyen event handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form verilerini gönderen event handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitApplication(formData);
      setFormData({
        name: '',
        service: '',
        phone: '',
        email: '',
        message: ''
      });
      setError(null); // Önceki hataları temizle
    } catch (err) {
      setError('Error submitting application.');
    }
  };

  return (
    <div className="event-and-contact">
      <div className="events">
        <h2>Some of Our Events</h2>
        {error && <div className="error">{error}</div>}
        {events.length > 0 ? (
          events.map((event) => (
            <div className="event" key={event._id}>
              <div className="date">
                <div>{new Date(event.date).getDate()}</div>
                <div>{new Date(event.date).toLocaleString('en', { month: 'short' })}</div>
              </div>
              <div className="details">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>
                  <i className="fa fa-clock"></i> {event.time} &nbsp;
                  <i className="fa fa-map-marker"></i> {event.location}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
      <div className="contact-forms">
        <h2>Online Application</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name and Surname"
            value={formData.name}
            onChange={handleChange}
          />
          <select name="service" value={formData.service} onChange={handleChange}>
            <option value="">Select a service</option>
            <option value="general">General</option>
            {/* Add other options here */}
          </select>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Write your message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default EventAndContact;
