import React, { useEffect, useState } from 'react';
import "./UsersPage.css"

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editUserId, setEditUserId] = useState(null); // Güncellenecek kullanıcı ID'si
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '', // Şifreyi de ekliyoruz
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/results')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
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

  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: '', // Şifreyi temizleyelim
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/results/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
        setFilteredUsers(filteredUsers.map(user => (user._id === updatedUser._id ? updatedUser : user)));
        setEditUserId(null); // Güncellemeyi bitir
        setFormData({ username: '', email: '', phone: '', password: '' }); // Formu temizle
      } else {
        throw new Error('Kullanıcı güncellenirken bir hata oluştu.');
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td  className='button-style' >
                <button onClick={() => handleEditClick(user)}>Düzenle</button>
                <button onClick={() => deleteUser(user._id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUserId && (
        <div className="edit-form">
          <h2>Kullanıcıyı Düzenle</h2>
          <form onSubmit={handleUpdateUser}>
            <input
              type="text"
              name="username"
              placeholder="Kullanıcı Adı"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Telefon"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Yeni Şifre (isteğe bağlı)"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button type="submit">Güncelle</button>
            <button type="button" onClick={() => setEditUserId(null)}>İptal</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
