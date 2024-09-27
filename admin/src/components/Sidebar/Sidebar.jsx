import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { 
  MdSpaceDashboard, MdPeople, MdBarChart, MdNotifications, MdEvent, 
  MdOutlineTopic, MdOutlineContactMail, MdAppRegistration, MdOutlineAnnouncement 
} from "react-icons/md";
import { LiaSchoolSolid } from "react-icons/lia";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <SidebarOption to="/DashboardPage" icon={<MdSpaceDashboard />} label="Dashboard" />
        <SidebarOption to="/users" icon={<MdPeople />} label="Users" />
        <SidebarOption to="/reports" icon={<MdBarChart />} label="Reports" />
        <SidebarOption to="/notifications" icon={<MdNotifications />} label="Notifications" />
        <SidebarOption to="/ExamManagement" icon={<MdPeople />} label="Exam" />
        <SidebarOption to="/TopicManagement" icon={<MdOutlineTopic />} label="Topic" />
        <SidebarOption to="/ContactManagement" icon={<MdOutlineContactMail />} label="Contact" />
        <SidebarOption to="/EventManagement" icon={<MdEvent />} label="Event" />
        <SidebarOption to="/JobApplicationFormManagement" icon={<MdOutlineAnnouncement />} label="Vacancies" />
        <SidebarOption to="/schoolManagement" icon={<LiaSchoolSolid />} label="School" />
        <SidebarOption to="/RegistrationManagement" icon={<MdAppRegistration />} label="Registration" />
        <SidebarOption to="/PlaceOrderManagement" icon={<MdAppRegistration />} label="PlaceOrder" />
        <SidebarOption to="/preparationManagement" icon={<MdAppRegistration />} label="Preparation" />
        <SidebarOption to="/fltManagement" icon={<MdAppRegistration />} label="FLT" />
        <SidebarOption to="/MIQManagement" icon={<MdAppRegistration />} label="MIQ" />
        <SidebarOption to="/AboutUsManagement" icon={<MdAppRegistration />} label="About Us" />
        <SidebarOption to="/ExamResultsManagement" icon={<examResultsManagement />} label="ExamResultsManagement" />
      </div>
    </div>
  );
};

const SidebarOption = ({ to, icon, label }) => (
  <div className="sidebar-option">
    {icon}
    <Link className="sidebar-link" to={to}>{label}</Link>
  </div>
);

export default Sidebar;
