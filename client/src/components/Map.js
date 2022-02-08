import React, { useState, useEffect, useRef } from "react";
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const BikeMap = ({ bikeRacks }) => {
  
  // Set initial state - used to track references to OpenLayers 
  const [map, setMap] = useState();
  
  // Keep a ref to the map div element - OpenLayers will render into this div 
  const mapElement = useRef();
  
  // Function handles loading the map. It is called by useEffect at render time. 
  const loadMap = () => {
    // TileLayer: USGS Topo 
    const tileLayer = new TileLayer({
      source: new OSM(),
    });
    
    // Create map 
    const initialMap = new Map({
      target: mapElement.current,
      layers: [tileLayer],
      view: new View({
        projection: 'EPSG:4326',
        center: [-122.34, 47.6062],
        zoom: 11
      }),
    });
    
    // Save map and vector layer references to state 
    setMap(initialMap);
  };
  
  useEffect(() => {
    // Load the Map into the DOM 
    loadMap();
  }, []);
  
  return (
    <div ref={mapElement} className="bike-map">
    </div>
  )
}

export default BikeMap;