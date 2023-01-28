import styles from './avatar.module.css'
import bg from '../public/avatarians.jpg'
import { Navbar } from '@nextui-org/react'
import { useState } from 'react'

export interface AvatarPosition {
  x: number,
  y: number
}

const Avatar = (position: AvatarPosition) => {

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

  const [thePosition, setThePosition] = useState<any>(calculatePixels())


  const custom = <span
    className={styles.avatar}
    style={{
      backgroundImage: `url(${bg.src})`,
      backgroundPositionX: thePosition.x,
      backgroundPositionY: thePosition.y
    }}
   />

  return (
    <Navbar.Item>
      {custom}
    </Navbar.Item>
  )
}

export { Avatar }
