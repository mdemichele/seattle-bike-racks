import React from "react";
import Map from "../components/Map";
import Search from "../components/Search";

function HomePage() {
  const bikeRacks = [];
  return (
    <div className="home-page">
    
      {/* Search Bar */}
      <Search />
      
      {/* Bike Rack Map */}
      <Map bikeRacks={bikeRacks} />
    </div>
  )
}

export default HomePage;