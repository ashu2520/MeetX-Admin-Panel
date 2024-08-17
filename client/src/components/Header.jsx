import React from "react";
import img1 from "../assets/logo.svg";
const Header = () => {
  return (
    <div className="header_main">
      <div className="wrapper_main">
        <div className="logo_main">
          <a href="/listusers">
            <img src={img1} alt="Logo" />
          </a>
        </div>
        <div className="right_side_main">
          <ul>
            <li style={{ color: "white" }}>Welcome Admin</li>

            <li>
              <a href="/"  style={{ color: "white" }}>Log Out</a>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="nav_top_main">
        <ul className="sm:text-sm lg:text-base" >
          <li className="active">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/listusers">Users</a>
          </li>
          <li>
            <a href="">Employee</a>
          </li>
          <li>
            <a href="">Meeting List</a>
          </li>
          <li>
            <a href="">Withdraw List</a>
          </li>
          <li>
            <a href="">Reported post List</a>
          </li>
          <li>
            <a href="">Change Password</a>
          </li>
          <li>
            <a href="">Manage Template</a>
          </li>
          <li>
            <a href="">Manage Testimonials</a>
          </li>
          <li>
            <a href="">Settings</a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Header;
