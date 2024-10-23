import React from 'react';
import './services.css'; // You can create a separate CSS file for styling
import { Link } from 'react-router-dom';

const Services = () => {

  return (
    <div className="services-container" data-aos="fade-up" data-aos-duration="1500" >
      <h2>ƏSAS XİDMƏTLƏRİMİZ</h2>
      <div className="services">
        <div className="service">
          <div className="icon orange">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <Link to="/School">ORTA MƏKTƏBƏ VƏ KOLLECƏ HAZIRLIQ</Link>
        </div>
        <div className="service">
          <div className="icon green">
            <i className="fas fa-book"></i>
          </div>
          <Link to="/Preparation">MAGİSTRA HAZIRLIĞI</Link>
        </div>
        <div className="service">
          <div className="icon blue">
            <i className="fas fa-gem"></i>
          </div>
          <Link to="/FLT">XARİCİ DİL HAZIRLIĞI</Link>
        </div>
        <div className="service">
          <div className="icon green">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <Link to="/MIQ">MÜƏLLİMLƏRİN İŞƏ QƏBULUNA HAZIRLIQ</Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
