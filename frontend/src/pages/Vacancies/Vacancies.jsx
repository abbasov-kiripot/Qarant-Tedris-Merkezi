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
    cv: null, // Dosya null başlar
  });

  // Input alanı değişikliklerini yakala
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(`Form data changed: ${name}: ${value}`); // Form verilerini konsola yazdır
  };

  // Dosya seçildiğinde
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Dosya türü kontrolü
    const allowedTypes = [
      'application/pdf', // PDF dosyası
      'image/jpeg',      // JPEG resmi
      'image/png',       // PNG resmi
      'image/jpg'        // JPG resmi
    ];

    if (file && allowedTypes.includes(file.type)) {
      setFormData((prevData) => ({
        ...prevData,
        cv: file, // Seçilen dosyayı kaydet
      }));
      console.log('Seçilen CV dosyası:', file);
    } else {
      console.error('Geçersiz dosya türü. Lütfen yalnızca PDF veya resim dosyası yükleyin.'); // Hata mesajını konsola yazdır
      alert('Lütfen yalnızca PDF veya resim dosyası yükleyin.');
    }
  };

// Formu gönderdiğinde
const handleSubmit = async (e) => {
  e.preventDefault();

  const { firstName, lastName, email, cv, fatherName, dateOfBirth, phone, additionalNotes } = formData;

  // Gerekli alanların doldurulup doldurulmadığını kontrol et
  if (!firstName || !lastName || !email) {
    console.error('Gerekli alanlar doldurulmadı:', formData);
    alert('Lütfen gerekli tüm alanları doldurun.');
    return;
  }

  // CV dosyasının varlığını kontrol et
  if (!cv) {
    console.error('CV dosyası yüklenmedi.'); 
    alert('Lütfen bir CV dosyası yükleyin.');
    return;
  }

  // CV yüklendiyse Cloudinary'e yükle
  let cvUrl = '';
  try {
    const cloudinaryData = new FormData();
    cloudinaryData.append('file', cv);
    cloudinaryData.append('upload_preset', 'tbrgiuze');

    const cloudinaryResponse = await fetch(
      'https://api.cloudinary.com/v1_1/de6kealil/upload',
      {
        method: 'POST',
        body: cloudinaryData,
      }
    );

    if (!cloudinaryResponse.ok) {
      throw new Error('CV dosyası yüklenirken hata oluştu.');
    }

    const cloudinaryResult = await cloudinaryResponse.json();
    console.log('Cloudinary Yükleme Sonucu:', cloudinaryResult);
    cvUrl = cloudinaryResult.secure_url;
  } catch (error) {
    console.error('CV yüklenirken hata:', error);
    alert('CV yüklenirken hata oluştu. Lütfen tekrar deneyin.');
    return;
  }

  // Backend'e gönderilecek form verileri
  const formDataToSend = {
    firstName,
    lastName,
    fatherName,
    dateOfBirth: new Date(dateOfBirth).toISOString(),
    email,
    phone,
    additionalNotes,
    cv: cvUrl,
  };

  // Backend'e veri gönderimi
  try {
    const response = await fetch('http://localhost:8080/api/JobApplications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSend),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Form gönderilirken hata oluştu:', errorText);
      alert('Form gönderilirken hata oluştu. Lütfen tekrar deneyin.');
      return;
    }

    const result = await response.json();
    console.log('Form başarıyla gönderildi:', result);

    // Formu temizle
    setFormData({
      firstName: '',
      lastName: '',
      fatherName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      additionalNotes: '',
      cv: null,
    });

    alert('Form başarıyla gönderildi!');
  } catch (error) {
    console.error('Form gönderilirken hata oluştu:', error);
    alert('Form gönderilirken hata oluştu. Lütfen tekrar deneyin.');
  }
};



  return (
    <div className="application-form">
      <h1>İş Müraciəti</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ad *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Soyadı *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ata Adı</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Doğum tarixi *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>E-poçt *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefon *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Əlavə Qeydlər</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>CV yükləyin!</label>
          <input
            type="file"
            name="cv"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
