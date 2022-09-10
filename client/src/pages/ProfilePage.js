import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import profile from '../profile.png';

function ProfilePage() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [bikeRacks, setBikeRacks] = useState([]);
  
  useEffect(async () => {
    // Send a request for user information 
    const user = await axios.post("/user", {
      userId: id
    });
    
    // Set state 
    setUsername(user.data.username);
    setBikeRacks(user.data.bikes);
    console.log(user);
  }, []);
  
  return (
    <div className="profile-page">
      <Header />
      
      <div className="profile-body-container">
        <div className="profile-left-container">
          <img className="profile-photo" src={profile} />
          <h3 className="profile-username">Welcome {username}!</h3>
          <a href="/logout">Logout</a>
        </div>
      
          <div className="profile-right-container">
          
            {/* Subheader */}
            <div className="profile-subheader-container">
              <h3 className="profile-subheader">Favorite Bike Racks</h3>
            </div>
            
            {/* Bike Rack Table */}
            <div className="profile-bike-list">
              {bikeRacks.map((address) => {
                <div className="profile-bike-container">
                  <p className="profile-bike-address">{address}</p>
                </div> 
              })}
            </div>
            
          </div>
        </div>
    </div>
  )
}

export default ProfilePage;