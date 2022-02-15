import React, { useState } from "react";

const Search = ({ searchCoordinates, setSearchCoordinates }) => {
  const [address, setAddress] = useState("");
  
  function handleSubmit(event) {
    event.preventDefault();
    alert("Got address: " + address);
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