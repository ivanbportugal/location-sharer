import styles from './avatar.module.css'
import bg from '../public/avatarians.jpg'
import { Navbar } from '@nextui-org/react'

const Avatar = () => {

  // X: -6px. -> -38px -> -73 -> 109 ~= 35px apart. 25 columns
  // Y: -9px -> -45px -> -79 -> -115. ~= 35px apart. 4 rows.

  const custom = <span
    className={styles.avatar}
    style={{
      backgroundImage: `url(${bg.src})`,
      backgroundPositionX: '20px',
      backgroundPositionY: '60px'
    }}
   />

  return (
    <Navbar.Item>
      {custom}
    </Navbar.Item>
  )
}

export { Avatar }
