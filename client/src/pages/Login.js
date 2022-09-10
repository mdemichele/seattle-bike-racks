import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import profile from '../profile.png';
import axios from 'axios';

function LoginPage({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Handle form submissions
  async function handleSubmit(event) {
    event.preventDefault();
    
    const token = await loginUser(username, password);
    console.log(token);
    setToken(token);
    
    alert("Successfully logged in.");
  }
  
  // Submit login request to the server 
  async function loginUser(username, password) {
    let response = await axios.post("/login", {
      username: username,
      password: password,
    });
    
    console.log(response.data);
    return response.data;
    
  }
  
  return (
    <div className="login-page">
      {/* Header Area */}
      <Header />
      
      <div className="login-body-container">
        
        {/* Login Card */}
        <div className="login-card">
          
          {/* Login Title */}
          <div className="login-title-container">
            <img className="login-profile" src={profile} alt="profile" />
          </div>
          
          {/* Login Form */}
          <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <input name="username" className="login-form-input" placeholder="Username" type="text" value={username} autoComplete="off" onChange={(event) => setUsername(event.target.value)} />
              
              <input name="password" className="login-form-input" placeholder="Password" type="text" value={password} autoComplete="off" onChange={(event) => setPassword(event.target.value)} />
              
              <button type="submit" className="login-form-submit">Login</button>
            </form>
            
            {/* Links */}
            <div className="login-form-bottom-links">
              <a href="/register" className="login-bottom-links">Register New User</a>
              <a href="/" className="login-bottom-links">Forgot Password?</a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginPage;