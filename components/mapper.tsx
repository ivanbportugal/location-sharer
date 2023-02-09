'use client'
import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

const Mapper = ({updatePosition}) => {

  const mapInstance = useMap()
  const [position, setPosition] = useState(null)

  useEffect(() => {
    if (updatePosition) {
      setPosition(updatePosition)
      mapInstance.locate()
      mapInstance.flyTo(position, mapInstance.getZoom())
    }
  }, [updatePosition]);

  // const updatePosition = (newPosition: GeolocationPosition) => {
  //   setPosition(newPosition)
  //   mapInstance.locate()
  //   mapInstance.flyTo(position, mapInstance.getZoom())
  // }

  const LocationMarker = () => {
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
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  )
}

export default Mapper
