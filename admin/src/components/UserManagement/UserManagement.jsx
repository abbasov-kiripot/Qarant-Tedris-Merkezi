import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', age: 25, class: 'Math 101' },
    { id: 2, name: 'Jane Smith', age: 22, class: 'Science 202' },
  ]);

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <p>Öğrenci ve eğitmenleri yönetin.</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
