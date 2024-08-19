import React from 'react';
import './DashboardOverview.css';

const DashboardOverview = () => {
  return (
    <div className="dashboard-overview">
      <h2>Dashboard Overview</h2>
      <p>Giriş ve genel performans göstergelerini görüntüleyin.</p>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Courses</h3>
          <p>30</p>
        </div>
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>1200</p>
        </div>
        <div className="stat-card">
          <h3>Total Instructors</h3>
          <p>75</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
