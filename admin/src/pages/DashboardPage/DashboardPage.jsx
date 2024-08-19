import React from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  // Dummy data for demonstration purposes
  const statistics = {
    totalCourses: 25,
    totalUsers: 150,
    activeCourses: 10,
    inactiveCourses: 15,
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h2>Genel Bakış</h2>
        <p>Bu sayfa, kurslar, kullanıcılar ve genel performans hakkında özet bilgiler içerir.</p>
      </header>
      <section className="dashboard-stats">
        <div className="stat-card">
          <h3>Toplam Kurs</h3>
          <p>{statistics.totalCourses}</p>
        </div>
        <div className="stat-card">
          <h3>Toplam Kullanıcı</h3>
          <p>{statistics.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Aktif Kurslar</h3>
          <p>{statistics.activeCourses}</p>
        </div>
        <div className="stat-card">
          <h3>Pasif Kurslar</h3>
          <p>{statistics.inactiveCourses}</p>
        </div>
      </section>
      <section className="dashboard-charts">
        <div className="chart">
          <h3>Kurs Performansı</h3>
          {/* Placeholder for chart component */}
          <div className="chart-placeholder">Grafik Burada</div>
        </div>
        <div className="chart">
          <h3>Kullanıcı Aktivitesi</h3>
          {/* Placeholder for chart component */}
          <div className="chart-placeholder">Grafik Burada</div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
