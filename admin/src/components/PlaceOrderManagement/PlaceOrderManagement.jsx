import React, { useState, useEffect } from "react";
import "./PlaceOrderManagement.css";
import { FaEye } from "react-icons/fa";

const PlaceOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrdersFromAPI = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/orders");
        if (!response.ok) {
          throw new Error('Siparişleri alırken bir hata oluştu.');
        }
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchOrdersFromAPI();
  }, []);

  useEffect(() => {
    const filtered = orders.filter(order =>
      order.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  // Siparişi silme fonksiyonu
  const handleDelete = async (firstName, lastName, email) => {
    if (window.confirm("Bu siparişi silmek istediğinize emin misiniz?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/orders`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, lastName, email }), // Bilgileri burada gönderiyoruz
        });

        if (!response.ok) {
          throw new Error('Siparişi silerken bir hata oluştu.');
        }

        // Silme işlemi başarılı olduğunda sipariş listesini güncelle
        const updatedOrders = orders.filter(order =>
          order.firstName !== firstName || order.lastName !== lastName || order.email !== email
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        setMessage('Sipariş başarıyla silindi.');
      } catch (error) {
        console.error('Siparişi silerken hata:', error);
        setMessage(error.message);
      }
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); // 3 saniye

      return () => clearTimeout(timer); // Temizleme işlemi
    }
  }, [message]);

  return (
    <div className="place-order-management">
      <header>
        <h1>Sipariş Yönetimi</h1>
        <input
          className="search"
          type="text"
          placeholder="İsim veya E-posta ile Ara"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>
      {message && <p className="message">{message}</p>}
      <table>
        <thead>
          <tr>
            <th>İsim</th>
            <th>E-posta</th>
            <th>Sınav Tarihi</th>
            <th>Şehir</th>
            <th>Tip</th>
            <th>Fiyat</th>
            <th>Ödeme Yöntemi</th>
            <th>Makbuz URL</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order._id}>
              <td>{order.firstName} {order.lastName}</td>
              <td>{order.email}</td>
              <td>{order.examDate}</td>
              <td>{order.city}</td>
              <td>{order.examType}</td>
              <td>${order.ticketPrice}</td>
              <td>{order.paymentMethod}</td>
              <td>
                {order.receiptFile ? (
                  <a href={order.receiptFile} target="_blank" rel="noopener noreferrer">
                    <FaEye className="eye-icon" title="Görüntüle" />
                  </a>
                ) : (
                  "Yüklenmemiş"
                )}
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(order.firstName, order.lastName, order.email)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaceOrderManagement;
