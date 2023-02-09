import styles from './avatar.module.css'
import bg from '../public/avatarians.jpg'
import { useEffect, useState } from 'react'

export interface AvatarPosition {
  x: number,
  y: number
}

const Avatar = (position: AvatarPosition = {x: 1, y: 1}) => {
  
  const [thePosition, setThePosition] = useState<any>({
    x: '-1px',
    y: '-1px'
  })

  // X: -6px. -> -38px -> -73 -> 109 ~= 35px apart. 25 columns
  // Y: -9px -> -45px -> -79 -> -115. ~= 35px apart. 4 rows.
  const calculatePixels = () => {
    const valueX = -((position.x * 35) + 6)
    const valueY = -((position.y * 35) + 9)
    setThePosition({
      x: valueX + 'px',
      y: valueY + 'px'
    })
  }

  useEffect(() => {
    if (position) {
      calculatePixels()
    }
  }, [position])

  const custom = <span
    className={styles.avatar}
    style={{
      backgroundImage: `url(${bg.src})`,
      backgroundPositionX: thePosition.x,
      backgroundPositionY: thePosition.y
    }}
   />

  return (
    <>
      {custom}
    </>
  )
}

export { Avatar }
