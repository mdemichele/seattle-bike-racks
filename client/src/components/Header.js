import logo from '../logo.svg';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="App-header">
    
      {/* Logo */}
      <div className="App-header-logo-container">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      
      {/* Title */}
      <div className="App-header-title-container">
        <Link to="/" id="header-title"><h3 className="App-header-title">Seattle Bike Rack Map</h3></Link>
      </div>
      
      {/* Link */}
      <div className="App-header-link-container">
        <Link className="App-link" to="add-rack">Add Bike Rack</Link>
      </div>
      
    </header>
  )
}

export default Header;