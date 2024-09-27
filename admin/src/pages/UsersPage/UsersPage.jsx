import React, { useEffect, useState } from 'react';
import "./UsersPage.css"

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/results')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data); // İlk yüklemede filtrelenmiş kullanıcıları da güncelle
      })
      .catch(err => setError('Kullanıcılar getirilirken bir hata oluştu.'));
  }, []);

  // Arama işlemini filtreleme
  useEffect(() => {
    const filtered = users.filter(user =>
      [user.username, user.email, user.phone]
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/results/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user._id !== id));
        setFilteredUsers(filteredUsers.filter(user => user._id !== id));
      } else {
        throw new Error('Kullanıcı silinirken bir hata oluştu.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='user-container'>
      <h1>Kullanıcılar</h1>
      <input
        type="text"
        placeholder="Search by Name, Email, or Phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>Sil</button>
                {/* Düzenleme butonu ve fonksiyonları ekleyebilirsiniz */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
