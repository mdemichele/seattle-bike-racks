import React, { useState } from "react";
import axios from "axios";

const Search = ({ searchCoordinates, setSearchCoordinates, address, setAddress }) => {
  
  async function handleSubmit(event) {
    event.preventDefault();
  
    // Send the address to the backend 
    let message = {
      address: address
    };
    
    // Get the lat/long back from backend 
    const response = await axios.post("/forward-geocode", message);
  
    // Set lat/long as the coordinates state variable
    setSearchCoordinates(response.data);
  };
  
  return (
    <div className="search-component">
      <h3 className="search-title">Search By Address</h3>
      
      <form className="search-form" onSubmit={handleSubmit}>
        <input name="address" className="form-input" placeholder="Enter Address" type="text" value={address} onChange={(event) => setAddress(event.target.value)}/>
        <button type="submit" className="form-submit">Submit</button>
      </form>
    </div>
  )
}

export default Search;