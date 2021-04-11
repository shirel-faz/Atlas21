import React, { Component, useEffect, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../assets/data';
import Markers from './VenueMarkers';

function MapView (props) {

  let [currentLocation, setCurrentLocation] = useState({ lat:props.lat , lng: props.lng });
  let [zoom, setZoom] = useState(7);

  useEffect(()=>{
      setCurrentLocation({ lat:props.lat , lng: props.lng });
  }, [props.lat, props.lng])

    return (

      <Map center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        
        <Markers venues={data.venues}/>
      </Map>

    );
  }


export default MapView;
