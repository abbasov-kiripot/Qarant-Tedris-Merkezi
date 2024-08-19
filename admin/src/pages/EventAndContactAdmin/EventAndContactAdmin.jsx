// src/Admin/EventAndContactAdmin.js

import React, { useState, useEffect } from "react";
import "./EventAndContactAdmin.css";

function EventAndContactAdmin() {
  const [events, setEvents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [newEvent, setNewEvent] = useState({
    date: "",
    title: "",
    description: "",
    time: "",
    location: "",
  });

  useEffect(() => {
    // API'den etkinlikleri ve başvuruları çek
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data));

    fetch("/api/applications")
      .then((response) => response.json())
      .then((data) => setApplications(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = () => {
    // API'ye yeni etkinlik ekle
    fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((event) => setEvents([...events, event]));
  };

  const deleteEvent = (id) => {
    // API'den etkinlik sil
    fetch(`/api/events/${id}`, { method: "DELETE" })
      .then(() => setEvents(events.filter((event) => event.id !== id)));
  };

  return (
    <div className="event-and-contact-admin">
      <div className="event-management">
        <h2>Manage Events</h2>
        <div className="event-list">
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-date">
                <div>{event.date}</div>
              </div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>
                  <i className="fa fa-clock"></i> {event.time} &nbsp;{" "}
                  <i className="fa fa-map-marker"></i> {event.location}
                </p>
                <button onClick={() => deleteEvent(event.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className="add-event">
          <h3>Add New Event</h3>
          <input
            type="text"
            name="date"
            placeholder="Date (e.g., 05 May)"
            value={newEvent.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newEvent.description}
            onChange={handleInputChange}
          ></textarea>
          <input
            type="text"
            name="time"
            placeholder="Time (e.g., 12:00-18:00)"
            value={newEvent.time}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newEvent.location}
            onChange={handleInputChange}
          />
          <button onClick={addEvent}>Add Event</button>
        </div>
      </div>

      <div className="application-management">
        <h2>Manage Applications</h2>
        <div className="application-list">
          {applications.map((application) => (
            <div key={application.id} className="application-item">
              <p>Name: {application.name}</p>
              <p>Service: {application.service}</p>
              <p>Phone: {application.phone}</p>
              <p>Email: {application.email}</p>
              <p>Message: {application.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventAndContactAdmin;
