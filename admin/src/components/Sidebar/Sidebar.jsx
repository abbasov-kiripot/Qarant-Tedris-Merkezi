import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { MdSpaceDashboard, MdCardTravel, MdPeople, MdBarChart, MdNotifications, MdEvent } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <div className="sidebar-option">
          <MdSpaceDashboard className="sidebar-icon" />
          <Link className="sidebar-link" to="/DashboardOverview">Dashboard</Link>
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
          <MdEvent className="sidebar-icon" />
          <Link className="sidebar-link" to="/EventAndContactAdmin">EventAndContact</Link>
        </div>
        <div className="sidebar-option">
          <MdPeople className="sidebar-icon" />
          <Link className="sidebar-link" to="/ExamInfoAdmin">ExamInfoAdmin</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
