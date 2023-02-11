'use client'
import { RefObject, useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import { Map } from "leaflet"

const Mapper = ({updatePosition}) => {

  // const [position, setPosition] = useState(null)
  
  // useEffect(() => {
  //   if (updatePosition) {
  //     setPosition(updatePosition)
  //     mapInstance.locate()
  //     mapInstance.flyTo(position, mapInstance.getZoom())
  //   }
  // }, [updatePosition]);
  
  // const updatePosition = (newPosition: GeolocationPosition) => {
    //   setPosition(newPosition)
    //   mapInstance.locate()
    //   mapInstance.flyTo(position, mapInstance.getZoom())
    // }
    
  const LocationMarker = ({thePosition}) => {
    const mapInstance = useMap()

    if (!thePosition) {
      return null
    }

    const coords = {
      lat: thePosition.coords.latitude,
      lng: thePosition.coords.longitude
    }

    mapInstance.locate()
    mapInstance.flyTo(coords, mapInstance.getZoom())
    // const [position, setPosition] = useState(null)
    // const map = useMapEvents({
    //   click() {
    //     map.locate()
    //   },
    //   locationfound(e) {
    //     setPosition(e.latlng)
    //     map.flyTo(e.latlng, map.getZoom())
    //   },
    // })
  
    return (
      <Marker position={coords}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  // const resizeMap = () => {
  //   const map = useMap()
  //   map.
    
  //   // const container = document.getElementById('map-container')
  //   if (container) {
  //     resizeObserver.observe(container)
  //   }
  // }

  return (
    <div style={{height: '500px'}}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        // whenReady={() => resizeMap()}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker thePosition={updatePosition} />
      </MapContainer>
    </div>
  )
}

export default Mapper
