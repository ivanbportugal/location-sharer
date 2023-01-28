import localForage from 'localforage'
import dayjs from 'dayjs'
import { AvatarPosition } from '../components/avatar';

const NAME_KEY = 'NAME'
const AVATAR_KEY = 'AVATAR'

interface Loc {
  timestamp: number;
  coords: Coords;
  name?: string;
}
interface Coords {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

const parseEpoch = (value: number) => {
  return dayjs(value)
}

const getAllLocations = async () => {
  if (typeof window !== 'undefined') {
    await localForage.ready()
    const keys = await localForage.keys()
    const allKeyValues: Promise<Loc | null>[] = []

    keys.forEach(key => {
      if (key !== NAME_KEY && key !== AVATAR_KEY) {
        // Everything else is coordinates
        allKeyValues.push(localForage.getItem<Loc>(key))
      }
    })

    const whenAllComplete = await Promise.all(allKeyValues)
    return whenAllComplete
  }
}

const convert = (location: GeolocationPosition, name?: string) => {
  return <Loc>{
    timestamp: location.timestamp,
    name,
    coords: {
      accuracy: location.coords.accuracy,
      altitude: location.coords.altitude,
      altitudeAccuracy: location.coords.altitudeAccuracy,
      heading: location.coords.heading,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      speed: location.coords.speed
    }
  }
}

const addLocation = async (location: GeolocationPosition, name?: string) => {
  if (typeof window !== 'undefined') {
    await localForage.ready()
    const copy = convert(location, name)
    await localForage.setItem(copy.timestamp.toString(), copy)
  }
}

const getName = async () => {
  if (typeof window !== 'undefined') {
    await localForage.ready()
    return await localForage.getItem<string>(NAME_KEY)
  }
}

const getAvatar = async () => {
  if (typeof window !== 'undefined') {
    await localForage.ready()
    return await localForage.getItem<AvatarPosition>(AVATAR_KEY)
  }
}

const setName = async (name: string) => {
  if (typeof window !== 'undefined') {
    await localForage.ready()
    await localForage.setItem(NAME_KEY, name)
  }
}

const setAvatar = async (value: AvatarPosition) => {
  if (typeof window !== 'undefined') {
    await localForage.ready()
    await localForage.setItem(AVATAR_KEY, value)
  }
}

const clear = async () => {
  if (typeof window !== 'undefined') {
    await localForage.ready();
    await localForage.clear();
  }
}

export {
  getAllLocations,
  parseEpoch,
  addLocation,
  getName,
  setName,
  getAvatar,
  setAvatar,
  clear
}
