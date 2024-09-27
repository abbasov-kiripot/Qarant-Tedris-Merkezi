import React, { useState, useEffect } from "react";
import "./PlaceOrderManagement.css";

const PlaceOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Siparişleri almak için API çağrısı yapılır.
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
          setFilteredOrders(data);
        } else {
          setMessage('Failed to fetch orders.');
        }
      } catch (error) {
        setMessage('An error occurred while fetching orders.');
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    // Arama terimine göre siparişleri filtreler.
    const filtered = orders.filter(order =>
      order.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);


  const handleDelete = async (orderId) => {
    if (!orderId || orderId.length !== 24) {
      setMessage('Invalid order ID.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
        setFilteredOrders((prevFilteredOrders) =>
          prevFilteredOrders.filter((order) => order._id !== orderId)
        );
        setMessage('Order deleted successfully.');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Failed to delete order.');
      }
    } catch (error) {
      setMessage('An error occurred while deleting the order.');
    }
  };
  
  
    

  return (
    <div className="place-order-management">
      <header>
        <h1>Order Management</h1>
        <input className="Search"
          type="text"
          placeholder="Search by Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>
      {message && <p className="message">{message}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Exam Date</th>
            <th>City</th>
            <th>Type</th>
            <th>Price</th>
            <th>Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.firstName} {order.lastName}</td>
              <td>{order.email}</td>
              <td>{order.examDate}</td>
              <td>{order.city}</td>
              <td>{order.examType}</td>
              <td>${order.ticketPrice}</td>
              <td>{order.paymentMethod}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaceOrderManagement;
