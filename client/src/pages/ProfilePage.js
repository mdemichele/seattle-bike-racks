import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import profile from '../profile.png';

function ProfilePage() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [bikeRacks, setRacks] = useState([]);
  
  // Delete Favorite Button 
  async function handleClick(event) {
    const address = event.target.attributes[0].value;
    
    let response = await axios.post("/delete-favorite", {
      userId: id,
      bikeRack: address
    });
    
    let filteredBikes = response.data.bikes;
    setRacks(filteredBikes);
  }
  
  useEffect(() => {
    // Send a request for user information 
    fetch("/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: id}),
    })
    .then(res => res.json())
    .then(
      (result) => {
        setRacks(result.bikes);
        setUsername(result.username);
      },
      (error) => {
        console.log("Something happened");
      });
  }, [])
  
  return (
    <div className="profile-page">
      <Header />
      
      <div className="profile-body-container">
        <div className="profile-left-container">
          <img className="profile-photo" src={profile} />
          <h3 className="profile-username">Welcome {username}!</h3>
          
          <div className="profile-buttons-container">
            <a className="profile-logout" href="/logout">Logout</a>
            <a className="profile-add-rack" href="/add-rack">Add Rack</a>
          </div>
        </div>
      
          <div className="profile-right-container">
          
            {/* Subheader */}
            <div className="profile-subheader-container">
              <h3 className="profile-subheader">Favorite Bike Racks</h3>
            </div>
            
            {/* Bike Rack Table */}
            <div className="profile-bike-list">
              {bikeRacks.map((address) => (
                <div className="profile-bike-container">
                  <p key={address} className="profile-bike-address">• {address}</p>
                  <button id={address} className="profile-bike-delete" onClick={handleClick}>Delete</button>
                </div> 
              ))}
            </div>
            
          </div>
        </div>
    </div>
  )
}

export default ProfilePage;