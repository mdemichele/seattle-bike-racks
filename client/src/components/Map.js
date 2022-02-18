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
import Overlay from 'ol/Overlay';
import marker from './map-marker.png';
import { defaults, ZoomSlider } from 'ol/control';
import { fromLonLat } from 'ol/proj';

const BikeMap = ({ searchCenter }) => {
  
  // Set initial state - used to track references to OpenLayers 
  const [map, setMap] = useState();
  const [popup, setPopup] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [zoom, setZoom] = useState(11);
  
  // Keep a ref to the map div element - OpenLayers will render into this div 
  const mapElement = useRef();
  const popupElement = useRef();
  
  const mapRef = useRef();
  mapRef.current = map;
  
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
    
    // Create Popup 
    const popup = new Overlay({
      element: popupElement.current,
      positioning: 'bottom-center',
      stopEvent: false,
    });
    setPopup(popup);
    initialMap.addOverlay(popup);
    
    // Save map and vector layer references to state 
    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);
    
    // Attach event handler 
    initialMap.on('click', handleMapClick);
  };
  
  // Function handles map clicks: Shows a popup if a marker is clicked 
  const handleMapClick = function(event) {
    // Get the bike rack if it's been clicked 
    const feature = mapRef.current.forEachFeatureAtPixel(event.pixel, function(feature) {
      return feature;
    });
    
    // If a brewery has been clicked...
    if (feature) {
      // Get the popup OpenLayers element 
      let popupOverlay = event.map.overlays_.array_[0];
      popupOverlay.element.style.display = "block";
      // Set the position on the map of the popup 
      popupOverlay.setPosition(event.coordinate);
      
      // Set the text to be the address of the bike rack 
      popupOverlay.element.innerText = feature.get('address');
      popupOverlay.element.style.background = 'white';
      popupOverlay.element.style.padding = "10px";
      
    } 
    // Remove the bike rack popup if somewhere else on the map is clicked 
    else {
      let popupOverlay = event.map.overlays_.array_[0];
      popupOverlay.element.style.display = 'none';
    }
  }
  
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
      
      // Add marker for the radius 
      let radiusMarker = new Feature({
        geometry: new Point([searchCenter.lon, searchCenter.lat])
      });
      let markerStyle1 = new Style({
        image: new Circle({
          fill: new Fill({
            color: [42, 84, 164, 0.2]
          }),
          radius: 300
        })
      });
      // Style of the marker 
      radiusMarker.setStyle(markerStyle1);
      
      // Add marker for the center point 
      let center = new Feature({
        geometry: new Point([searchCenter.lon, searchCenter.lat])
      });
      
      let markerStyle2 = new Style({
        image: new Circle({
          fill: new Fill({
            color: [220, 69, 51, 1]
          }),
          radius: 8
        })
      });
      // Style the center point 
      center.setStyle(markerStyle2);
      
      // Create a new vector source 
      let vectorSource = new VectorSource({
        features: [radiusMarker, center]
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
      <div ref={popupElement} className="popup"></div>
    </div>
  )
}

export default BikeMap;