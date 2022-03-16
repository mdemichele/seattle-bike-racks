import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

function AddRackPage() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  
  async function handleSubmit(event) {
    event.preventDefault();
    
    let response = await axios.post("/add-new-bike-rack", {
      address: address,
      latitude: latitude,
      longitude: longitude
    });
    
    alert(response.data.message);
  }
  
  return (
    <div className="add-rack-page">
    
      {/* Header Area */}
      <Header />
    
      <div className="add-title-container">
        <h3>Add A New Bike Rack</h3>
      </div>
      
      {/* Add Bike Rack */}
      <div className="add-form-container">
        <form className="add-form" onSubmit={handleSubmit}>
        
          {/* Address */}
          <div className="form-row">
            <label className="form-label">Address</label>
            <input className="form-input" type="text" value={address} onChange={(event)=> { setAddress(event.target.value) }} />
          </div>
          
          {/* Latitude */}
          <div className="form-row">
            <label className="form-label">Latitude</label>
            <input className="form-input" type="text" value={latitude} onChange={(event) => { setLatitude(event.target.value) }} />
          </div>
          
          {/* Longitude */}
          <div className="form-row">
            <label className="form-label">Longitude</label>
            <input className="form-input" type="text" value={longitude} onChange={(event) => { setLongitude(event.target.value) }} />
          </div>
          
          {/* Submit */}
          <button type="submit" className="form-submit">Submit</button>
        </form>
      </div>
      
      
    </div>
  )
}

export default AddRackPage;