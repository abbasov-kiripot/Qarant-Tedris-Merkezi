import React, { useState } from 'react';
import './UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ali Veli', role: 'Öğrenci', age: 20, class: '10A' },
    { id: 2, name: 'Ayşe Yılmaz', role: 'Eğitmen', age: null, class: null },
    { id: 3, name: 'Mehmet Can', role: 'Öğrenci', age: 22, class: '11B' },
    { id: 4, name: 'Fatma Yurt', role: 'Eğitmen', age: null, class: null }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', age: '', class: '' });

  const handleAddUser = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.age && newUser.class) {
      const newStudent = { id: Date.now(), ...newUser, role: 'Öğrenci' };
      setUsers([...users, newStudent]);
      setNewUser({ name: '', age: '', class: '' });
      setShowForm(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleRemoveUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="users-page">
      <h2>Kullanıcı Yönetimi</h2>
      <p>Bu sayfada öğrenci ve eğitmen bilgilerini yönetebilirsiniz.</p>
      <div className="users-actions">
        <button className="btn" onClick={handleAddUser}>Öğrenci Ekle</button>
        <button className="btn">Eğitmen Ekle</button>
      </div>
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Yeni Öğrenci Ekle</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                İsim:
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Yaş:
                <input
                  type="number"
                  name="age"
                  value={newUser.age}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Sınıf:
                <input
                  type="text"
                  name="class"
                  value={newUser.class}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit" className="btn">Ekle</button>
              <button type="button" className="btn btn-close" onClick={() => setShowForm(false)}>Kapat</button>
            </form>
          </div>
        </div>
      )}
      <div className="user-list">
        {users.length > 0 ? (
          <ul>
            {users.map(user => (
              <li key={user.id} className="user-item">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
                {user.age && <span className="user-age">Yaş: {user.age}</span>}
                {user.class && <span className="user-class">Sınıf: {user.class}</span>}
                <button className="btn-remove" onClick={() => handleRemoveUser(user.id)}>Sil</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Kullanıcı bulunmuyor.</p>
        )}
      </div>
    </div>
  );
}

export default UsersPage;
