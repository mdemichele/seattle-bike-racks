import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/Home';
import AddRackPage from './pages/AddRack';
import Microservice from './pages/Microservice';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-rack" element={<AddRackPage />} />
          <Route path="/microservice/map/:lat&:long" element={<Microservice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
