import React, { useState } from "react";
import "./PlaceOrder.css";
import { useLocation } from "react-router-dom";

const PlaceOrder = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const examDate = queryParams.get('date');
  const city = queryParams.get('city');
  const examType = queryParams.get('type');
  const ticketPrice = parseFloat(queryParams.get('price')) || 10;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    phone: "",
    paymentMethod: "creditCard",
    receiptFile: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Dosya türü kontrolü
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (file && allowedTypes.includes(file.type)) {
      setFormData({ ...formData, receiptFile: file });
    } else {
      alert('Lütfen yalnızca PDF veya resim dosyası yükleyin.');
    }
  };

  const uploadFileToCloudinary = async (file) => {
    const cloudinaryData = new FormData();
    cloudinaryData.append('file', file);
    cloudinaryData.append('upload_preset', 'tbrgiuze'); // Cloudinary'deki upload preset

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/de6kealil/upload', {
        method: 'POST',
        body: cloudinaryData,
      });

      if (!response.ok) {
        throw new Error('Dosya yüklenirken hata oluştu.');
      }

      const result = await response.json();
      console.log('Cloudinary yükleme başarılı:', result.secure_url); // Başarı mesajı
      return result.secure_url; // Cloudinary'den dönen URL
    } catch (error) {
      console.error('Cloudinary yükleme hatası:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Yükleniyor...');

    let receiptFileUrl = ''; // Değişiklik
    if (formData.receiptFile) {
      receiptFileUrl = await uploadFileToCloudinary(formData.receiptFile);
      if (!receiptFileUrl) {
        setMessage('Dosya yüklenemedi.');
        console.error('Cloudinary yüklemesi başarısız, dosya yüklenemedi.'); // Hata mesajı
        return;
      }
    }

    const formDataToSubmit = {
      ...formData,
      examDate,
      city,
      examType,
      ticketPrice,
      receiptFile: receiptFileUrl, // Cloudinary URL'si burada backend'e gönderilecek
    };

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });

      if (response.ok) {
        setMessage('Sifariş uğurla yerinə yetirildi!');
        console.log('Sipariş başarıyla gönderildi:', formDataToSubmit); // Başarı mesajı
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          phone: "",
          paymentMethod: "creditCard",
          receiptFile: null,
        });
      } else {
        setMessage('Sifarişi tamamlamaq mümkün olmadı.');
        console.error('Sipariş gönderimi başarısız, yanıt:', await response.json()); // Hata mesajı
      }
    } catch (error) {
      setMessage('Sifarişi tamamlama zamanı xəta baş verdi.');
      console.error('Sipariş gönderimi sırasında hata:', error); // Hata mesajı
    }
  };

  return (
    <>
      {message && <div className={`notification ${message.includes('uğurla') ? 'success' : 'error'}`}>{message}</div>}
      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">MƏLUMATLARINIZ</p>
          <div className="multi-fields">
            <input
              type="text"
              placeholder="AD"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="SOYAD"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email "
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="ATA ADI"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="TELEFON"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="place-order-right">
          <p className="right-p">Ödəniş metodunu seçin</p>
          <div className="radio-buttons">
            <input
              type="radio"
              name="paymentMethod"
              id="creditCard"
              value="creditCard"
              checked={formData.paymentMethod === "creditCard"}
              onChange={handleChange}
            />
            <label htmlFor="creditCard">Credit Card</label>
            <input
              type="radio"
              name="paymentMethod"
              id="m10"
              value="m10"
              checked={formData.paymentMethod === "m10"}
              onChange={handleChange}
            />
            <label htmlFor="m10">m10</label>
          </div>
          <div className="paymentReceipt">
            <label className="File">Ödəniş qəbzini yerləşdirin</label>
            <input type="file" onChange={handleFileChange} />
            {formData.receiptFile && (
              <p>Uploaded File: {formData.receiptFile.name}</p>
            )}
          </div>
          <p className="terms">
            Sifariş verməklə siz bizimlə razılaşırsınız
            {" "}
            <a href="/Terms">
              Qaydalar və Şərtlər</a>
          </p>
          <button type="submit">Bilet alın</button>
        </div>
        <div className="order-summary">
          <h2>Bilet məlumatlariniz</h2>
          <p>İmtahan Tarixi: {examDate}</p>
          <p>Filial: {city}</p>
          <p>İmtahan növü: {examType}</p>
          <p>Məbləğ: ₼{ticketPrice}</p>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
