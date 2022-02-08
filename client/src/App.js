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
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-header-title-container">
          <Link to="/"><h3 className="App-header-title">Seattle Bike Rack Map</h3></Link>
        </div>
        <Link className="App-link" to="add-rack">Add Bike Rack</Link>
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
