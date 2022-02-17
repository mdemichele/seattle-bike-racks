import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { transform } from 'ol/proj';
import { Icon, Style, Fill, Circle } from 'ol/style';
import XYZ from 'ol/source/XYZ';
import marker from './map-marker.png';
import { defaults, ZoomSlider } from 'ol/control';
import { fromLonLat } from 'ol/proj';

const BikeMap = ({ searchCenter }) => {
  
  // Set initial state - used to track references to OpenLayers 
  const [map, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [zoom, setZoom] = useState(11);
  
  // Keep a ref to the map div element - OpenLayers will render into this div 
  const mapElement = useRef();
  
  // Function handles loading the map. It is called by useEffect at render time. 
  const loadMap = async () => {
    // Create a marker for each bike racks in bikeRacks array 
    const responseFromServer = await axios.get("/bike-racks");
    const bikes = responseFromServer.data;
    
    const rackIcons = bikes.map((rack) => {
      // Create Feature 
      let currentIcon = new Feature({
        geometry: new Point([rack.long, rack.lat]),
        address: rack.address
      });
      // Set Icon style 
      let iconStyle = new Style({
        image: new Icon({
          imgSize: [50, 50],
          src: marker
        })
      });
      // Set style 
      currentIcon.setStyle(iconStyle);
      return currentIcon;
    });
    
    // Create vector source 
    const vectorSource = new VectorSource({
      features: rackIcons
    });
    
    // Create and add vector source layer 
    const initialFeaturesLayer = new VectorLayer({
      source: vectorSource
    });
    
    // TileLayer: USGS Topo 
    const tileLayer = new TileLayer({
      source: new OSM(),
    });
    
    // Create map 
    const initialMap = new Map({
      target: mapElement.current,
      layers: [tileLayer, initialFeaturesLayer],
      view: new View({
        projection: 'EPSG:4326',
        center: [searchCenter.lon, searchCenter.lat],
        zoom: zoom
      }),
    });
    
    // Save map and vector layer references to state 
    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);
  };
  
  useEffect(() => {
    // Load the Map into the DOM 
    loadMap();
  }, []);
  
  useEffect(() => {
    // Set the new zoom and new center if search term is entered  
    if (searchCenter.lon != -122.34 && searchCenter.lat != 47.6062) {
      // Set Zoom 
      map.getView().setZoom(map.getView().getZoom() + 6);
      // Set Center 
      map.getView().setCenter([searchCenter.lon, searchCenter.lat]);
      
      // Add marker 
      let centerMarker = new Feature({
        geometry: new Point([searchCenter.lon, searchCenter.lat])
      });
      let markerStyle = new Style({
        image: new Circle({
          fill: new Fill({
            color: [42, 84, 164, 0.7]
          }),
          radius: 12
        })
      });
      // Style of the marker 
      centerMarker.setStyle(markerStyle);
      // Create a new vector source 
      let vectorSource = new VectorSource({
        features: [centerMarker]
      });
      
      // Createa new vector layer 
      let vectorLayer = new VectorLayer({
        source: vectorSource
      });
      
      map.addLayer(vectorLayer);
      
    } 
    // Do nothing if no search term has been entered 
    else {
      return 
    }
    
  }, [searchCenter]);
  
  return (
    <div ref={mapElement} className="bike-map">
    </div>
  )
}

export default BikeMap;