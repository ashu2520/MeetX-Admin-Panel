import React from 'react'
import { Link } from 'react-router-dom';
import DashIcon from "../assets/icons/Dashboard.svg";
import UserIcon from "../assets/icons/Users.svg";
import MeetingIcon from "../assets/icons/Meeting.svg";
import ChangePasswordIcon from "../assets/icons/ChangePassword.svg";
import ManageTemplateIcon from "../assets/icons/ManageTemplates.svg";
import ManageTestimonialsIcon from "../assets/icons/ManageTestimonials.svg";
import ReportIcon from "../assets/icons/Reported.svg";
import SettingsIcon from "../assets/icons/Settings.svg";
import WithdrawIcon from "../assets/icons/Withdraw.svg";
import EmployeeIcon from "../assets/icons/Employee.svg";
import connectionRequestIcon from "../assets/icons/connectionRequest.svg";

const Sidebar = () => {
   const route=window.location.pathname;

  return (
    <>
    <div className='bg-white w-60 min-h-screen shadow-2xl z-20'>
        <Link to="/dashboard" className={`flex ${route === "/dashboard" ? "bg-[#5247D1] text-white" : "bg-white text-black hover:bg-indigo-100"} gap-2 p-2 w-full items-center `}>
           <img src={DashIcon} alt="" className="w-4"/>
           <span>Dashboard</span> 
        </Link>
        <Link to="/users" className={`flex ${route === "/users"? "bg-[#5247D1] text-white " : "bg-white text-black hover:bg-indigo-100"} gap-2 p-2 w-full items-center `}>
           <img src={UserIcon} alt="" className="w-4"/>
           <span>Users</span> 
        </Link>
        <Link to="/employees" className={`flex ${route === "/employees" ? "bg-[#5247D1] text-white" : "bg-white text-black hover:bg-indigo-100"} gap-2 p-2 w-full items-center `}>
           <img src={EmployeeIcon} alt="" className="w-4"/>
           <span>Employee</span> 
        </Link>
        <Link to="/meeting-list" className={`flex ${route === "/meeting-list" ? "bg-[#5247D1] text-white" : "bg-white text-black hover:bg-indigo-100"} gap-2 p-2 w-full items-center `}>
           <img src={MeetingIcon} alt="" className="w-4"/>
           <span>Meeting List</span> 
        </Link>
        <Link to="/withdraw-list" className={`flex ${route === "/withdraw-list" ? "bg-[#5247D1] text-white" : "bg-white text-black hover:bg-indigo-100"} gap-2 p-2 w-full items-center `}>
           <img src={WithdrawIcon} alt="" className="w-4"/>
           <span>Withdraw List</span> 
        </Link>
        <Link to="/reported-post" className={`flex ${route === "/reported-post"? "bg-[#5247D1] text-white " : "bg-white text-black hover:bg-indigo-100"} gap-2 p-2 w-full items-center `}>
           <img src={ReportIcon} alt="" className="w-4"/>
           <span>Reported Post List</span> 
        </Link>
        <Link to="/change-password" className={`flex ${route === "/change-password"? "bg-[#5247D1] text-white " : "bg-white text-black hover:bg-indigo-100"} gap-2 p-2 w-full items-center `}>
           <img src={ChangePasswordIcon} alt="" className="w-4"/>
           <span>Change Password</span> 
        </Link>
        <Link to="/manage-templates" className={`flex ${route === "/manage-templates"? "bg-[#5247D1] text-white " : "bg-white text-black hover:bg-indigo-100"} gap-2 p-2 w-full items-center `}>
           <img src={ManageTemplateIcon} alt="" className="w-4"/>
           <span>Manage Templates</span> 
        </Link>
        <Link to="/manage-testimonials" className={`flex ${route === "/manage-testimonials"? "bg-[#5247D1] text-white " : "bg-white text-black hover:bg-indigo-100"} gap-2 p-2 w-full items-center `}>
           <img src={ManageTestimonialsIcon} alt="" className="w-4"/>
           <span>Manage Testimonials</span> 
        </Link>
        <Link to="/connection-requests" className={`flex ${route === "/connection-requests" ? "bg-[#5247D1] text-white" : "bg-white text-black hover:bg-indigo-100"} gap-2 p-2 w-full items-center `}>
           <img src={connectionRequestIcon} alt="" className="w-4"/>
           <span>Connection Requests</span> 
        </Link>
        <Link to="/settings" className={`flex ${route === "/settings" ? "bg-[#5247D1] text-white" : "bg-white text-black hover:bg-indigo-100"} gap-2 p-2 w-full items-center `}>
           <img src={SettingsIcon} alt="" className="w-4"/>
           <span>Manage Settings</span> 
        </Link>
    </div>
    </>
  )
}

export default Sidebar