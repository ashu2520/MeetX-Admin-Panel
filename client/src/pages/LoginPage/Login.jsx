import React, { useState } from 'react';
import logo from "../../assets/logo.svg"
import axios from 'axios';
import {ToastContainer,  toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const notify = (message) => toast.error(message);
  
  const loginSuccessful = (message) => {
    toast.success(message)
    toast.loading('Redirecting to dashboard...')
  }

  const handleLogin = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost:8081/api/admins/login', {
      admin_email: username,
      admin_password: password
    })
    .then((res) => {
      sessionStorage.setItem("token", res.data.accesstoken);
      loginSuccessful("Login successful!");
      window.location.href = "/dashboard";
    })
    .catch((err) => {
      if (err.response) {
        notify(err.response.data.error); 
      } else {
        notify(err.message);
      }
    });
  };


  return (
    <>
          <div className="flex w-full justify-center bg-[#DBE3FF]">
            <div>
              <img src={logo} alt="Logo" className='logoImg'/>
            </div>
          </div>
    <div className="login_section">
      <div className="wrapper relative">
        <div className="heading-top">
        </div>
        <div className="box">
          <div className="outer_div">
            <h2>
              Admin <span>Login</span>
            </h2>
            <form className="margin_bottom" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    const value = (e.target.value).trim();
                    return setUsername(value)}}
                  required={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
              </div>
              <div className="form-group">
              <div className='rememberMe'>
                <input type="checkbox" />
                <label>Remember me</label>
              </div>
              </div>
              <button type="submit" className="btn_login">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    <ToastContainer/>
    </div>
    </>
  );
};

export default Login;
