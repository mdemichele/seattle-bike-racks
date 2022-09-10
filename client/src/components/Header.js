import bike from '../bike.svg';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import useToken from '../components/useToken';

function Header() {
  const { token, setToken } = useToken();
  const [status, setStatus] = useState("Register/Login");
  const [statusLink, setStatusLink] = useState("/register");
  
  useEffect(() => {
    console.log(token);
    if (token) {
      setStatus("View Profile");
      setStatusLink(`/profile/${token}`);
    }
  
  }, []);
  
  return (
    <header className="App-header">
    
      {/* Logo */}
      <div className="App-header-logo-container">
        <img src={bike} className="App-logo" alt="logo" />
      </div>
      
      {/* Title */}
      <div className="App-header-title-container">
        <Link to="/" id="header-title"><h3 className="App-header-title">Seattle Bike Rack Map</h3></Link>
      </div>
      
      {/* Link */}
      <div className="App-header-link-container">
        {/* <Link className="App-link" to="add-rack">Add Bike Rack</Link> */}
        <Link className="App-link" to={statusLink}>{status}</Link>
      </div>
      
    </header>
  )
}

export default Header;