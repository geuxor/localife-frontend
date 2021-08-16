import React, { useState, useEffect } from 'react'
import './Map.css'
import ReactMapGL from 'react-map-gl'
import Geocode from 'react-geocode'

export default function Map() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  })

  const [viewport, setViewport] = useState({
    width: '35vw',
    height: '80vh',
    latitude: location.latitude,
    longitude: location.longitude,
    zoom: 5,
  })

  useEffect(() => {
    setViewport((prevValue) => {
      return {
        ...prevValue,
        latitude: location.latitude,
        longitude: location.longitude,
      }
    })
  }, [location])

  useEffect(() => {
    Geocode.setApiKey(process.env.REACT_APP_GEOGOOGLE)

    Geocode.setLocationType('APPROXIMATE')

    Geocode.fromAddress('Madrid').then(
      (response) => {
        console.log(response)
        const { lat, lng } = response.results[0].geometry.location
        console.log('LATITUDE =', lat, 'LONGITUDE =', lng)
        setLocation({
          latitude: lat,
          longitude: lng,
        })
      },
      (error) => {
        console.error(error)
      },
    )
  }, [])

  return (
    <div className="map">
      {location.longitude && location.latitude ? (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapStyle="mapbox://styles/sebastiangreen/ckrnp8ur54xux17mswwup4dhk"
        ></ReactMapGL>
      ) : null}
    </div>
  )
}
