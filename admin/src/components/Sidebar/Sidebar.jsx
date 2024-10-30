import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { 
  MdSpaceDashboard, MdPeople, MdBarChart, MdNotifications, MdEvent, 
  MdOutlineTopic, MdOutlineContactMail, MdAppRegistration, MdOutlineAnnouncement,
  MdSchool, MdShoppingCart, MdAssignment, MdQuiz, MdInfo, MdGrade
} from "react-icons/md";
import { GiIdCard } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";

// Menü öğelerini kategorilere ayırıyoruz
const menuCategories = {
  main: [
    { to: "/DashboardPage", icon: <MdSpaceDashboard />, label: "Dashboard" },
    { to: "/users", icon: <MdPeople />, label: "Users" },
    { to: "/reports", icon: <MdBarChart />, label: "Reports" },
    { to: "/notifications", icon: <MdNotifications />, label: "Notifications" },
    { to: "/CardManagement", icon: <GiIdCard />, label: "Card" },

    
  ],
  education: [
    { to: "/ExamManagement", icon: <MdGrade />, label: "Exam" },
    { to: "/schoolManagement", icon: <MdSchool />, label: "School" },
    { to: "/TopicManagement", icon: <MdOutlineTopic />, label: "Topic" },
    { to: "/ExamResultsManagement", icon: <MdBarChart />, label: "Exam Results" },
    { to: "/fltManagement", icon: <MdQuiz />, label: "FLT" },
    { to: "/MIQManagement", icon: <MdAssignment />, label: "MIQ" },
  ],
  management: [
    { to: "/ContactManagement", icon: <MdOutlineContactMail />, label: "Contact" },
    { to: "/EventManagement", icon: <MdEvent />, label: "Event" },
    { to: "/JobApplicationFormManagement", icon: <MdOutlineAnnouncement />, label: "Vacancies" },
    { to: "/RegistrationManagement", icon: <MdAppRegistration />, label: "Registration" },
    { to: "/StudentManagement", icon: <PiStudentBold />, label: "Student" },

  ],
  other: [
    { to: "/PlaceOrderManagement", icon: <MdShoppingCart />, label: "Place Order" },
    { to: "/preparationManagement", icon: <MdAssignment />, label: "Preparation" },
    { to: "/AboutUsManagement", icon: <MdInfo />, label: "About Us" },
  ]
};

const Sidebar = () => {
  return (
    <div className="sidebar">
        <span className="logo-text">EduPanel</span>
    
      <div className="sidebar-options">
        <div className="sidebar-category">Main</div>
        {menuCategories.main.map(item => (
          <SidebarOption key={item.to} {...item} />
        ))}
        
        <div className="sidebar-category">Education</div>
        {menuCategories.education.map(item => (
          <SidebarOption key={item.to} {...item} />
        ))}
        
        <div className="sidebar-category">Management</div>
        {menuCategories.management.map(item => (
          <SidebarOption key={item.to} {...item} />
        ))}
        
        <div className="sidebar-category">Other</div>
        {menuCategories.other.map(item => (
          <SidebarOption key={item.to} {...item} />
        ))}
      </div>
    </div>
  );
};

const SidebarOption = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <div className={`sidebar-option ${isActive ? 'active' : ''}`}>
      {icon}
      <Link className="sidebar-link" to={to}>{label}</Link>
      <span className="sidebar-tooltip">{label}</span>
    </div>
  );
};

export default Sidebar;