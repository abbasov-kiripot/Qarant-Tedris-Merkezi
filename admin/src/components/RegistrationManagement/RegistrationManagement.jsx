import React, { useEffect, useState } from 'react';
import './RegistrationManagement.css';

const RegistrationManagement = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  // Kayıtları yükle
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/registrations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Token'ı başlığa ekleyin
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRegistrations(data);
          setFilteredRegistrations(data);
        } else {
          setMessage('Kayıtları alırken hata oluştu');
        }
      } catch (error) {
        setMessage('Sunucuya bağlanırken bir hata oluştu');
      }
    };

    fetchRegistrations();
  }, [token]);

  // Arama işlemini filtreleme
  useEffect(() => {
    const filtered = registrations.filter((registration) =>
      [registration.exam, registration.direction, registration.city, registration.firstName, registration.lastName, registration.fatherName, registration.phone]
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredRegistrations(filtered);
  }, [searchTerm, registrations]);

  // Kayıt silme
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/registrations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Token'ı ekleyin
        },
      });

      if (response.ok) {
        setRegistrations((prevRegistrations) =>
          prevRegistrations.filter((registration) => registration._id !== id)
        );
        setFilteredRegistrations((prevFilteredRegistrations) =>
          prevFilteredRegistrations.filter((registration) => registration._id !== id)
        );
        setMessage('Kayıt başarıyla silindi');
      } else {
        const errorData = await response.json();
        setMessage(`Hata: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Sunucuya bağlanırken bir hata oluştu');
    }
  };

  return (
    <div className="registration-management">
      <h2>Kayıt Yönetimi</h2>
      <input
        type="text"
        placeholder="Search by exam, direction, city, or name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {message && <p className="message">{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Exam</th>
            <th>Direction</th>
            <th>City</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Father's Name</th>
            <th>Phone</th>
            <th>Birth Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRegistrations.map((registration) => (
            <tr key={registration._id}>
              <td>{registration.exam}</td>
              <td>{registration.direction}</td>
              <td>{registration.city}</td>
              <td>{registration.firstName}</td>
              <td>{registration.lastName}</td>
              <td>{registration.fatherName}</td>
              <td>{registration.phone}</td>
              <td>{`${registration.birthDay}/${registration.birthMonth}/${registration.birthYear}`}</td>
              <td>
                <button
                  onClick={() => handleDelete(registration._id)}
                  className="delete-button"
                >
                  SİL
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationManagement;
