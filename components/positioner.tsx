import { Button } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { addLocation, clear, getAllLocations } from "../lib/local-data"
import { Mapper } from "./mapper"

const Positioner = () => {

  const [posData, setPosData] = useState('')
  const [errorData, setErrorData] = useState('')
  const [history, setHistory] = useState<GeolocationPosition[]>([])
  const [shareErrorData, setShareErrorData] = useState('')
  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition>()

  const [trackerId, setTrackerId] = useState(0)

  useEffect(() => {
    if (!('geolocation' in navigator)) { 
      // No geo
      setErrorData('Sorry, your browser doesn\'t support geolocation :(')
    }
    getAllLocations().then(all => setHistory(all as any))
  }, [])

  const parsePositionData: PositionCallback = async (rawPosition) => {
    console.log('Tracking Marker')
    setErrorData('')
    addLocation(rawPosition)
    setCurrentPosition(rawPosition)
    await setPosData(JSON.stringify(rawPosition.coords))
    getAllLocations().then(all => setHistory(all as any))
  }

  const parsePositionError: PositionErrorCallback = (error: any) => {
    switch (error.code) { 
    case error.PERMISSION_DENIED:           
      setErrorData("User denied the request for Geolocation.")
      break

    case error.POSITION_UNAVAILABLE: 
      setErrorData("Location information is unavailable.")
      break

    case error.TIMEOUT: 
      setErrorData("The request to get user location timed out.")
      break

    case error.UNKNOWN_ERROR: 
      setErrorData("An unknown error occurred.")
      break
    }
  }

  const getLocation = () => {
    if (errorData) {
      setPosData('Sorry, we can\'t get geolocation on your browser :(')
    } else {
      // Let's start
      const theId = navigator.geolocation.watchPosition(parsePositionData, parsePositionError, { 
        enableHighAccuracy: false, 
        timeout: 15000, 
        maximumAge: 0
      });
      setTrackerId(theId)
    }
  }

  const clearAll = async () => {
    await clear()
    setHistory([])
  }

  const stopTracking = () => {
    if (trackerId > 0) {
      navigator.geolocation.clearWatch(trackerId)
      setTrackerId(0)
    }
  }

  const share = () => {
    if (history.length === 0) {
      setShareErrorData('Need to have at least one position to share it!')
    } else {
      setShareErrorData('')
      if (history.length > 0) {
        const toStore = JSON.stringify(history[history.length - 1])
        const garbled = window.btoa(toStore)
        console.log(`About to share `, garbled)
        // TODO launch dialog and share. On another page:
        // const back = window.atob(garbled)
      }
    }
  }

  if (errorData) {
    return (
      <h1>{errorData}</h1>
    )
  }

  return (<>
    <div>
      <p>{posData}</p>
      <Button onClick={getLocation}>Track location</Button>
      <Button onClick={stopTracking}>Stop tracking</Button>
    </div>
    <div>
      <h2>Historical:</h2>
      {history.map(item => {
        return <p key={item.timestamp}>{JSON.stringify(item.coords)}</p>
      })}
      <Mapper updatePosition={currentPosition} />
    </div>
    <div>
      <Button onClick={clearAll}>Clear</Button>
      <Button onClick={share}>Share</Button>
    </div>
    {shareErrorData && <h2>{shareErrorData}</h2>}
  </>)
}

export { Positioner }
