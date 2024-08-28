import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { MdSpaceDashboard, MdCardTravel, MdPeople, MdBarChart, MdNotifications, MdEvent, MdOutlineTopic, MdOutlineContactMail } from "react-icons/md";
import { LiaSchoolSolid } from "react-icons/lia";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <div className="sidebar-option">
          <MdSpaceDashboard className="sidebar-icon" />
          <Link className="sidebar-link" to="/DashboardPage">Dashboard</Link>
        </div>
        <div className="sidebar-option">
          <MdCardTravel className="sidebar-icon" />
          <Link className="sidebar-link" to="/CardManagement">Manage Cards</Link>
        </div>
        <div className="sidebar-option">
          <MdPeople className="sidebar-icon" />
          <Link className="sidebar-link" to="/users">Users</Link>
        </div>
        <div className="sidebar-option">
          <MdBarChart className="sidebar-icon" />
          <Link className="sidebar-link" to="/reports">Reports</Link>
        </div>
        <div className="sidebar-option">
          <MdNotifications className="sidebar-icon" />
          <Link className="sidebar-link" to="/notifications">Notifications</Link>
        </div>
        <div className="sidebar-option">
          <MdPeople className="sidebar-icon" />
          <Link className="sidebar-link" to="/ExamManagement">ExamManagement</Link>
        </div>
        <div className="sidebar-option">
          <MdOutlineTopic className="sidebar-icon" />
          <Link className="sidebar-link" to="/TopicManagement">TopicManagement</Link>
        </div>
        <div className="sidebar-option">
          <MdEvent className="sidebar-icon" />
          <Link className="sidebar-link" to="/EventManagement">EventManagement</Link>
        </div>
                <div className="sidebar-option">
          <LiaSchoolSolid className="sidebar-icon" />
          <Link className="sidebar-link" to="/JobApplicationFormManagement">VacanciesManagement</Link>
        </div>
        <div className="sidebar-option">
          <MdOutlineContactMail className="sidebar-icon" />
          <Link className="sidebar-link" to="/ContactManagement">ContactManagement</Link>
        </div>
        <div className="sidebar-option">
          <LiaSchoolSolid className="sidebar-icon" />
          <Link className="sidebar-link" to="/schoolManagement">schoolManagement</Link>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
