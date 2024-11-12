import React, { useState } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';

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

    const serviceID = 'service_br9gu7n';
    const templateID = 'template_9u8s6ja';
    const userID = 'AyP_QIfgP8PlN1YMp';

    const templateParams = {
      name: formData.name,
      service: formData.service,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID)
        .then(res => {
          if (res.status === 200) {
            alert("Tebrikler");
          }
        });

      setStatus('Message sent successfully via email!');
    } catch (error) {
      setStatus('Error sending email message');
      console.error(error);
    }

    try {
      const response = await fetch('http://localhost:8080/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Uğurla Göndərildi!');
        setFormData({
          name: '',
          service: '',
          phone: '',
          email: '',
          message: ''
        });

        // 1 saniye sonra mesajı temizle
        setTimeout(() => {
          setStatus('');
        }, 3000);
      } else {
        throw new Error('Failed to send message to the server');
      }
    } catch (error) {
      setStatus('Error sending message to the server');
      console.error(error);
    }
  };

  return (
    <div className="Contact">
      <header className="Contact-header">
        <span className='AH-1'> Bizimlə əlaqə </span>
      </header>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Ad və Soyad*
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ad və Soyad"
            required
          />
        </label>
        <label>
          Xidmət *
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Xidmət seçin</option>
            <option value="service1">Kursa necə qoşula bilərəm?</option>
            <option value="service4">Dərslər hansı günlərdə keçirilir?</option>
            <option value="service2">Kursun ödəniş qaydaları necədir?</option>
            <option value="service5">Kursun materiallarını necə əldə edə bilərəm?</option>
            <option value="service3">Kurs müəllimləri haqqında məlumat verə bilərsinizmi?</option>

          </select>
        </label>

        <label>
          Telefon nömrəsi *
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telefon nömrəsi "
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
          Əlavə qeyd *
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Əlavə təkliflər və iradlarinizi bildirə bilərsiniz"
            required
          ></textarea>
        </label>
        <button type="submit">Göndər</button>

        {status && <p className={status === 'Uğurla Göndərildi!' ? 'success-message' : 'error-message'}>{status}</p>}
      </form>

    </div>
  );
}

export default Contact;
