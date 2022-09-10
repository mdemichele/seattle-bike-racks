import React, { useEffect } from 'react';
import Header from '../components/Header';

function Logout() {
  
  function logoutUser() {
    sessionStorage.removeItem('token');
  }
  
  useEffect(() => {
    logoutUser();
  }, []);
  
  return (
    <div className="login-page">
      <Header />
      <h3>You've been logged out! Please refresh the page.</h3>
    </div>
  )
}

export default Logout;