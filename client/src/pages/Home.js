import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import Search from "../components/Search";

function HomePage() {
  const [searchCoordinates, setSearchCoordinates] = useState("");
  
  return (
    <div className="home-page">
    
      {/* Description Area */}
      <div className="description-container">
        <p className="description">Browse bike racks on the map below. You can click on each marker to get an address and specific details about each bike rack. You can also use the search bar to search for bike racks around a specific address.</p>
      </div>
    
      {/* Search Bar */}
      <Search searchCoordinates={searchCoordinates} setSearchCoordinates={setSearchCoordinates} />
      
      {/* Bike Rack Map */}
      <button className="refresh-button">Refresh Map</button>
      <Map />
      
      {/* Teammate Microservice */}
      <div className="team-microservice-container">
        <button className="team-microservice">See Graph of bike racks</button>
      </div>
    </div>
  )
}

export default HomePage;