import React from 'react';
import './services.css'; // You can create a separate CSS file for styling
import { Link } from 'react-router-dom';

const Services = () => {

  return (
    <div className="services-container">
      <h2>OUR MAIN SERVICES</h2>
      <div className="services">
        <div className="service">
          <div className="icon orange">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <Link to="/School">HIGH SCHOOL AND COLLEGE PREPARATION</Link>
        </div>
        <div className="service">
          <div className="icon green">
            <i className="fas fa-book"></i>
          </div>
          <Link to="/Preparation">MASTER'S PREPARATION</Link>
        </div>
        <div className="service">
          <div className="icon blue">
            <i className="fas fa-gem"></i>
          </div>
          <Link to="/FLT">FOREIGN LANGUAGE TRAINING</Link>
        </div>
        <div className="service">
          <div className="icon green">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <Link to="/MIQ">PREPARATION FOR RECRUITMENT OF TEACHERS</Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
