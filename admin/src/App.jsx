import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import CardManagement from './components/CardManagement/CardManagement';
import Dashboard from './components/DashboardOverview/DashboardOverview';
import CoursesPage from './pages/CoursesPage/CoursesPage'; // Kurs Yönetimi sayfası
import UsersPage from './pages/UsersPage/UsersPage'; // Kullanıcı Yönetimi sayfası
import ReportsPage from './pages/ReportsPage/ReportsPage'; // Raporlar sayfası
import NotificationsPage from './pages/NotificationsPage/NotificationsPage'; 
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EventAndContactAdmin from './pages/EventAndContactAdmin/EventAndContactAdmin';
import ExamInfoAdmin from './pages/ExamInfoAdmin/ExamInfoAdmin';

const App = () => {
  return (
      <div>
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/CardManagement" element={<CardManagement />} />
              <Route path='/DashboardOverview' element={<Dashboard />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/users" element={<UsersPage />} /> 
              <Route path="/reports" element={<ReportsPage />} /> 
              <Route path="/notifications" element={<NotificationsPage />} /> 
              <Route path='/DashboardPage' element={<DashboardPage/>}/>
              <Route path='/EventAndContactAdmin' element={<EventAndContactAdmin/>}/>
              <Route path='/ExamInfoAdmin' element={<ExamInfoAdmin/>}/>
            </Routes>
          </div>
        </div>
      </div>
  );
};

export default App;
