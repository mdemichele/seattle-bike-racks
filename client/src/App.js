import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/Home';
import AddRackPage from './pages/AddRack';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* App Header */}
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
      
      {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-rack" element={<AddRackPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
