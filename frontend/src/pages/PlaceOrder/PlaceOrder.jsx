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
    setFormData({ ...formData, receiptFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });
    formDataToSubmit.append("examDate", examDate);
    formDataToSubmit.append("city", city);
    formDataToSubmit.append("examType", examType);
    formDataToSubmit.append("ticketPrice", ticketPrice);

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        body: formDataToSubmit,
      });
      if (response.ok) {
        setMessage('Order placed successfully!');
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
        setMessage('Failed to place order.');
      }
    } catch (error) {
      setMessage('An error occurred while placing the order.');
    }
  };

  

  return (
    <>
      {message && <div className={`notification ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</div>}
      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">Your Data</p>
          <div className="multi-fields">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Street"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="place-order-right">
          <p className="right-p">Choose a Payment Method</p>
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
            <label className="File">Post the payment receipt</label>
            <input type="file" onChange={handleFileChange} />
            {formData.receiptFile && (
              <p>Uploaded File: {formData.receiptFile.name}</p>
            )}
          </div>
          <p className="terms">
            By placing your order, you agree to our{" "}
            <a href="#">Terms & Conditions</a>
          </p>
          <button type="submit">Buy a Ticket</button>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <p>Exam Date: {examDate}</p>
          <p>City: {city}</p>
          <p>Exam Type: {examType}</p>
          <p>Ticket Price: ${ticketPrice}</p>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
