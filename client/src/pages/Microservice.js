import React from 'react';
import { useParams } from 'react-router-dom';

function Microservice() {
  const { long } = useParams();
  
  return (
    <div className="microservice-page">
    <h3>{long}</h3>
    </div>
  );
}

export default Microservice;