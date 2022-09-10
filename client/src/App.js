import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/Home';
import AddRackPage from './pages/AddRack';
import LoginPage from './pages/Login';
import Logout from './pages/Logout';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/ProfilePage';
import Microservice from './pages/Microservice';
import Header from './components/Header';
import useToken from './components/useToken';

function App() {
  const { token, setToken } = useToken();
  
  return (
    <div className="App">
      <BrowserRouter>
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-rack" element={<AddRackPage />} />
          <Route path="/register" element={<RegisterPage setToken={setToken} />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/microservice/map/:lat&:long" element={<Microservice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
