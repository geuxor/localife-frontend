import React, { useState } from 'react'
import './Map.css'
import ReactMapGL from 'react-map-gl'

export default function Map() {
  const [viewport, setViewport] = useState({
    width: '35vw',
    height: '80vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10,
  })

  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/sebastiangreen/ckrnp8ur54xux17mswwup4dhk"
      ></ReactMapGL>
    </div>
  )
}
