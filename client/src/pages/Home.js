import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Map from "../components/Map";
import Search from "../components/Search";
import Header from '../components/Header';
import axios from 'axios';

function HomePage() {
  const [searchCoordinates, setSearchCoordinates] = useState({lon: -122.34, lat: 47.6062}); // Default long/lat of Seattle 
  const [address, setAddress] = useState("");
  const [graph, setGraph] = useState("");
  
  useEffect(async () => {
    const response = await axios.get("/get-graph");
    setGraph(response.data.url);
  });
  
  return (
    <div className="home-page">
      {/* Header Area */}
      <Header />
      
      {/* Description Area */}
      <div className="description-container">
        <p className="description">Browse bike racks on the map below. You can click on each marker to get an address and specific details about each bike rack. You can also use the search bar to search for bike racks around a specific address.</p>
      </div>
    
      {/* Search Bar */}
      <Search searchCoordinates={searchCoordinates} setSearchCoordinates={setSearchCoordinates} address={address} setAddress={setAddress}/>
      
      {/* Bike Rack Map */}
      <button className="refresh-button"><a href="/">Refresh Map</a></button>
      <Map searchCenter={searchCoordinates}/>
      
      {/* Teammate Microservice */}
      <div className="team-microservice-container">
        <button className="team-microservice"><a href={graph} target="_blank">See Graph of bike racks</a></button>
      </div>
    </div>
  )
}

export default HomePage;