import React, { useState } from 'react';
import Header from '../components/Header';
import RegisterPage from '../pages/Register';
import axios from 'axios';
import useToken from '../components/useToken';

function AddRackPage() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const { token, setToken } = useToken();
  
  async function handleSubmit(event) {
    event.preventDefault();
    
    let response = await axios.post("/add-new-bike-rack", {
      address: address,
      latitude: latitude,
      longitude: longitude
    });
    
    alert(response.data.message);
  }
  
  if (!token) {
    return <RegisterPage setToken={setToken} />
  }
  
  return (
    <div className="add-rack-page">
    
      {/* Header Area */}
      <Header />
    
      <div className="add-title-container">
        <h2>Add Bike Rack</h2>
      </div>
      
      {/* Add Bike Rack */}
      <div className="add-form-container">
        <form className="add-form" onSubmit={handleSubmit}>
        
          {/* Address */}
          <div className="add-form-row">
            <label className="add-form-label">Address</label>
            <input className="add-form-input" type="text" value={address} autoComplete="off" onChange={(event)=> { setAddress(event.target.value) }} />
          </div>
          
          {/* Latitude */}
          <div className="add-form-row">
            <label className="add-form-label">Latitude</label>
            <input className="add-form-input" type="text" value={latitude} autoComplete="off" onChange={(event) => { setLatitude(event.target.value) }} />
          </div>
          
          {/* Longitude */}
          <div className="add-form-row">
            <label className="add-form-label">Longitude</label>
            <input className="add-form-input" type="text" value={longitude} onChange={(event) => { setLongitude(event.target.value) }} />
          </div>
          
          {/* Submit */}
          <button type="submit" className="add-form-submit">Submit</button>
        </form>
      </div>
      
      
    </div>
  )
}

export default AddRackPage;