import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import CardManagement from './components/CardManagement/CardManagement';
import CoursesPage from './pages/CoursesPage/CoursesPage'; // Kurs Yönetimi sayfası
import UsersPage from './pages/UsersPage/UsersPage'; // Kullanıcı Yönetimi sayfası
import ReportsPage from './pages/ReportsPage/ReportsPage'; // Raporlar sayfası
import NotificationsPage from './pages/NotificationsPage/NotificationsPage'; 
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ExamManagement from './components/ExamManagement/ExamManagement';
import TopicManagement from './components/TopicManagement/TopicManagement';
import EventManagement from './components/EventManagement/EventManagement';
import ContactManagement from './components/ContactManagement/ContactManagement';
import SchoolManagement from './components/schoolManagement/schoolManagement';
import JobApplicationFormManagement from './components/VacanciesManagement/JobApplicationFormManagement';

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
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/users" element={<UsersPage />} /> 
              <Route path="/reports" element={<ReportsPage />} /> 
              <Route path="/notifications" element={<NotificationsPage />} /> 
              <Route path='/DashboardPage' element={<DashboardPage/>}/>
              <Route path='/ExamManagement' element={<ExamManagement/>}/>
              <Route path='/TopicManagement' element={<TopicManagement/>}/>
              <Route path='/EventManagement' element={<EventManagement/>}/>
              <Route path='/ContactManagement' element={<ContactManagement/>}/>
              <Route path='/schoolManagement' element={<SchoolManagement/>}/>
              <Route path='/JobApplicationFormManagement' element={<JobApplicationFormManagement/>}/>
            </Routes>
          </div>
        </div>
      </div>
  );
};

export default App;
