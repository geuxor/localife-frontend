import React, { useState, useEffect } from 'react'
import './Map.css'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Room } from '@material-ui/icons'
import Geocode from 'react-geocode'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

interface Location {
  latitude: number
  longitude: number
}

interface Viewport {
  width: string
  height: string
  latitude: Location['latitude']
  longitude: Location['longitude']
  zoom: number
}

export const Map: React.FC = () => {
  const [pins, setPins] = useState([] as any[])
  const [currentPinId, setCurrentPinId] = useState<number | null>(null)

  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  })

  const [viewport, setViewport] = useState<Viewport>({
    width: '37vw',
    height: '91vh',
    latitude: location.latitude,
    longitude: location.longitude,
    zoom: 11,
  })

  const getAllPins = async () => {
    try {
      const res = await axios.get('http://localhost:4001/experiences')
      setPins(res.data)
    } catch (e) {}
  }

  const handlePopupClick = (id, lat, long) => {
    setCurrentPinId(id)
    setViewport({ ...viewport, latitude: lat, longitude: long })
  }

  useEffect(() => {
    getAllPins()
  }, [])

  useEffect(() => {
    setViewport((prevValue) => {
      return {
        ...prevValue,
        latitude: location.latitude,
        longitude: location.longitude,
      }
    })
  }, [location])

  let search: string = useLocation().search
  let searchCity = new URLSearchParams(search).get('city')
  let searchCountry = new URLSearchParams(search).get('country')
  const filteredPins = pins.filter(
    (pin) => pin.city === searchCity && pin.country === searchCountry,
  )

  useEffect(() => {
    Geocode.setApiKey(process.env.REACT_APP_GEOGOOGLE)

    Geocode.setLocationType('APPROXIMATE')

    Geocode.fromAddress(`${searchCity}, ${searchCountry}`).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location
        setLocation({
          latitude: lat,
          longitude: lng,
        })
      },
      (error) => {},
    )
  }, [])

  return (
    <div className="map">
      {location.longitude && location.latitude ? (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapStyle="mapbox://styles/sebastiangreen/ckslt5mlr24ir17mwb1f33uog"
        >
          {filteredPins.map((pin) => (
            <>
              <Marker
                latitude={pin.lat}
                longitude={pin.lon}
                offsetLeft={-viewport.zoom * 4.25}
                offsetTop={-viewport.zoom * 8.5}
              >
                <Room
                  style={{
                    fontSize: viewport.zoom * 8.5,
                    color: 'tomato',
                    cursor: 'pointer',
                  }}
                  onClick={() => handlePopupClick(pin.id, pin.lat, pin.lon)}
                />
              </Marker>
              {pin.id === currentPinId && (
                <Popup
                  latitude={pin.lat}
                  longitude={pin.lon}
                  closeButton={true}
                  closeOnClick={true}
                  anchor="bottom"
                  onClose={() => setCurrentPinId(null)}
                >
                  <div className="popup">
                    <label>Experience</label>
                    <h4>{pin.title}</h4>
                    <label>Description</label>
                    <p>{pin.subtitle}</p>
                    <label>Price</label>
                    <p>€{pin.price}</p>
                  </div>
                </Popup>
              )}
            </>
          ))}
        </ReactMapGL>
      ) : null}
    </div>
  )
}
