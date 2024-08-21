import React, { useState } from 'react';
// import './Login.css'; 
import cross from "../../assets/unsucess-msg.png"
import logo from "../../assets/logo.svg"
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost:8081/api/admins/login', {
      admin_email: username,
      admin_password: password
    })
    .then((res) => {
      sessionStorage.setItem("token", res.data.accesstoken);
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data.error); 
      } else {
        console.log(err.message);
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
            {error && (
              <div className="error-message-div error-msg">
                <img src={cross} alt="Error" />
                <strong>Invalid!</strong> username or password
              </div>
            )}
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
    </div>
    </>
  );
};

export default Login;
