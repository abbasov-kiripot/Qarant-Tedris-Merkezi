import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import CardManagement from './components/CardManagement/CardManagement';
import CoursesPage from './pages/CoursesPage/CoursesPage';
import UsersPage from './pages/UsersPage/UsersPage';
import ReportsPage from './pages/ReportsPage/ReportsPage';
import NotificationsPage from './pages/NotificationsPage/NotificationsPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ExamManagement from './components/ExamManagement/ExamManagement';
import TopicManagement from './components/TopicManagement/TopicManagement';
import EventManagement from './components/EventManagement/EventManagement';
import ContactManagement from './components/ContactManagement/ContactManagement';
import SchoolManagement from './components/schoolManagement/schoolManagement';
import RegistrationManagement from './components/RegistrationManagement/RegistrationManagement';
import PlaceOrderManagement from './components/PlaceOrderManagement/PlaceOrderManagement';
import PreparationManagement from './components/preparationManagement/preparationManagement';
import FLTManagement from './components/fltManagement/fltManagement';
import MIQManagement from './components/MIQManagement/MIQManagement';
import AboutUsManagement from './components/AboutUsManagement/AboutUsManagement';
import ExamResultsManagement from './components/ExamResultsManagement/ExamResultsManagement';
import StudentManagement from './components/StudentManagement/StudentManagement';
import AdminLogin from './pages/adminlogin/Adminlogin';
import JobApplicationFormManagement from './components/VacanciesManagement/JobApplicationFormManagement.';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
      <div className="app-container">
        {isAuthenticated ? (
          <>
            <Navbar onLogout={handleLogout} />
            <hr />
            <div className="app-content">
              <Sidebar />
              <div className="main-content">
                <Routes>
                  <Route path="/CardManagement" element={<CardManagement />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/JobApplicationFormManagement" element={<JobApplicationFormManagement />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/DashboardPage" element={<DashboardPage />} />
                  <Route path="/ExamManagement" element={<ExamManagement />} />
                  <Route path="/TopicManagement" element={<TopicManagement />} />
                  <Route path="/EventManagement" element={<EventManagement />} />
                  <Route path="/ContactManagement" element={<ContactManagement />} />
                  <Route path="/schoolManagement" element={<SchoolManagement />} />
                  <Route path="/RegistrationManagement" element={<RegistrationManagement />} />
                  <Route path="/PlaceOrderManagement" element={<PlaceOrderManagement />} />
                  <Route path="/preparationManagement" element={<PreparationManagement />} />
                  <Route path="/fltManagement" element={<FLTManagement />} />
                  <Route path="/MIQManagement" element={<MIQManagement />} />
                  <Route path="/AboutUsManagement" element={<AboutUsManagement />} />
                  <Route path="/ExamResultsManagement" element={<ExamResultsManagement />} />
                  <Route path="/StudentManagement" element={<StudentManagement />} />
                  <Route path="*" element={<Navigate to="/DashboardPage" />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/admin-login" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<Navigate to="/admin-login" />} />
          </Routes>
        )}
      </div>
  );
};

export default App;
