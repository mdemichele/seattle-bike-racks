import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import profile from '../profile.png';

function RegisterPage({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  async function handleSubmit(event) {
    event.preventDefault();
    
    const token = await registerUser({
      username, password
    });
    
    setToken(token);
    
    alert(`Successfully registered.`);
  }
  
  async function registerUser(credentials) {
    return fetch('/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
  }
  
  return (
    <div className="register-page">
      {/* Header Area */}
      <Header />
      
      <div className="register-body-container">
        
        <div className="register-card">
          {/* Register Title */}
          <div className="register-title-container">
            <img className="register-profile" src={profile} alt="profile" />
          </div> 
        
          {/* Register Form */}
          <div className="register-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
              <input name="username" className="register-form-input" placeholder="Username" type="text" value={username} autoComplete="off" onChange={(event) => setUsername(event.target.value)}/>
          
              <input name="password" className="register-form-input" placeholder="Password" type="text" value={password} autoComplete="off" onChange={(event) => setPassword(event.target.value)}/>
          
              <button type="submit" className="register-form-submit">Register</button>
            </form>
            
            {/* Links */}
            <div className="form-bottom-links">
              <a href="/login" className="bottom-links">Login</a>
              <a href="/" className="bottom-links">Forgot Password?</a>
            </div>
          </div>
            
        </div>
        
      </div>
    </div>
  )
}

RegisterPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default RegisterPage;