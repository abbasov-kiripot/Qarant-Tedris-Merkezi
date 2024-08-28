import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './EventManagement.css'; // CSS dosyası

const socket = io('http://localhost:8080'); // WebSocket sunucusunun adresi

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/events');
        const data = await response.json();
        
        if (response.ok) {
          console.log("API Response:", data); // Veriyi inceleyin
        
          if (Array.isArray(data)) {
            setEvents(data);
          } else if (data.events && Array.isArray(data.events)) {
            setEvents(data.events); // Eğer 'events' içinde bir dizi varsa
          } else {
            console.error("Unexpected data format:", data);
            setEvents([]);
          }
        } else {
          throw new Error('Failed to fetch events');
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Error fetching events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    // WebSocket bağlantısını temizleme
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:8080/api/events/${currentEventId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      } else {
        response = await fetch('http://localhost:8080/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      }

      if (response.ok) {
        const data = await response.json();
        
        if (isEditing) {
          setEvents(events.map(event => event._id === currentEventId ? data : event));
        } else {
          setEvents([...events, data]);
        }
        
        socket.emit('updateEvents', data); // Yeni veya güncellenmiş etkinliği frontend’e bildir
        resetForm();
      } else {
        throw new Error('Failed to save event');
      }
    } catch (err) {
      console.error("Error saving event:", err);
      setError("Error saving event");
    }
  };

  const handleEditClick = (event) => {
    setFormState(event);
    setCurrentEventId(event._id);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvents(events.filter(event => event._id !== id));
        socket.emit('deleteEvent', id); // Silinen etkinliği frontend’e bildir
      } else {
        throw new Error('Failed to delete event');
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      setError("Error deleting event");
    }
  };

  const resetForm = () => {
    setFormState({
      title: '',
      description: '',
      date: '',
      time: '',
      location: ''
    });
    setIsEditing(false);
    setCurrentEventId(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="event-management-container">
      <h2>Event Management</h2>
      <div className="event-management-header">
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <textarea
          name="description"
          value={formState.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="date"
          name="date"
          value={formState.date}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          value={formState.time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          value={formState.location}
          onChange={handleInputChange}
          placeholder="Location"
        />
        <button onClick={handleFormSubmit}>
          {isEditing ? "Update Event" : "Add Event"}
        </button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </div>
      <div className="event-list">
        {events.length > 0 ? (
          events.map(event => (
            <div key={event._id} className="event-item">
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>
                  <i className="fa fa-calendar"></i> {new Date(event.date).toLocaleDateString()} &nbsp;
                  <i className="fa fa-clock"></i> {event.time} &nbsp;
                  <i className="fa fa-map-marker"></i> {event.location}
                </p>
              </div>
              <div className="event-actions">
                <button className="edit-btn" onClick={() => handleEditClick(event)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(event._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventManagement;
