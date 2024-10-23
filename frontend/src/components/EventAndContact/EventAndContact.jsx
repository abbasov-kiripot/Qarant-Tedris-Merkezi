import React, { useState, useEffect } from 'react';
import './EventAndContact.css';
import emailjs from '@emailjs/browser'; // EmailJS'i dahil ettik

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
        'Content-Type': 'application/json',
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
  const [status, setStatus] = useState(''); // Başarı veya hata durumlarını takip eden state
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

  // Form verilerini gönderen event handler (EmailJS ve API'ye)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // EmailJS parametreleri
    const serviceID = 'service_br9gu7n';
    const templateID = 'template_9u8s6ja';
    const userID = 'AyP_QIfgP8PlN1YMp'; // optional, only if you are using a user ID in EmailJS

    const templateParams = {
      name: formData.name,
      service: formData.service,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    };

    try {
      // EmailJS ile e-posta gönderimi
      await emailjs.send(serviceID, templateID, templateParams, userID);
      setStatus('Sorgu göndərilir...');
      
      // Aynı zamanda API'ye form verilerini gönderme
      await submitApplication(formData);
      setStatus('Uğurla göndərildi!');

      // Formu temizleme
      setFormData({
        name: '',
        service: '',
        phone: '',
        email: '',
        message: ''
      });

    } catch (error) {
      setStatus('Error sending message');
      console.error('Error:', error);
    }

    // Mesajın 3 saniye sonra kaybolmasını sağla
    setTimeout(() => {
      setStatus('');
    }, 3000);
  };

  // Mesajın 3 saniye sonra kaybolmasını sağla
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="event-and-contact" data-aos="fade-right" data-aos-duration="1500" >
      <div className="events">
        <h2>Tədbirlərimizdən Bəziləri</h2>
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
      <div className="contact-forms" data-aos="fade-left" data-aos-duration="2000" >
        <h2>Onlayn müraciət</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ad və Soyad"
            value={formData.name}
            onChange={handleChange}
          />
          <select name="service" value={formData.service} onChange={handleChange}>
            <option value="">Xidmət Seçin</option>
            <option value="general">General</option>
            {/* Add other options here */}
          </select>
          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="E-poçt"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Əlavə Qeyd"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">GÖNDƏR</button>
        </form>
        {status && <p className={`status ${status.includes('Error') ? 'error-message' : 'success-message'}`}>{status}</p>} {/* Başarı veya hata mesajı */}
      </div>
    </div>
  );
};

export default EventAndContact;
