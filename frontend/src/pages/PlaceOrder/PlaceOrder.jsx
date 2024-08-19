import React from "react";
import "./PlaceOrder.css";
import { useLocation } from "react-router-dom";

const PlaceOrder = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const examDate = queryParams.get('date');
  const city = queryParams.get('city');
  const examType = queryParams.get('type');
  const ticketPrice = parseFloat(queryParams.get('price')) || 10;

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Your Data</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="text" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <p className="right-p">Choose a Payment Method</p>
        <div className="radio-buttons">
          <input type="radio" name="paymentMethod" id="creditCard" />
          <label htmlFor="creditCard">Credit Card</label>
          <input type="radio" name="paymentMethod" id="m10" />
          <label htmlFor="m10">m10</label>
        </div>
        <div className="paymentReceipt">
          <label className="File">Post the payment receipt</label>
          <input type="file" />
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
  );
};

export default PlaceOrder;
