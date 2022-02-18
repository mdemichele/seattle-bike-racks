import React, { useState } from 'react';

function AddRackPage() {
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  
  function handleSubmit(event) {
    event.preventDefault();
    
    alert("Not implemented yet");
  }
  
  return (
    <div className="add-rack-page">
    
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
          
          {/* Notes */}
          <div className="form-row">
            <label className="form-label">Notes</label>
            <textarea className="form-text" value={notes} rows="10" cols="100" onChange={(event) => {setNotes(event.target.value) }} />
          </div>
          
          {/* Submit */}
          <button type="submit" className="form-submit">Submit</button>
        </form>
      </div>
      
      
    </div>
  )
}

export default AddRackPage;