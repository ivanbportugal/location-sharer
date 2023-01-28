import { Navbar, Text } from "@nextui-org/react"
import { useState } from "react"
import { getAvatar, getName, setName } from "../lib/local-data"
import { Avatar, AvatarPosition } from "./avatar"
import styles from './profile.module.css'

/**
 * Responsible for rendering the user's name and avatar
 * @returns 
 */
const Profile = () => {

  const [displayName, setDisplayName] = useState('')
  const [avatarPosition, setAvatarPosition] = useState<AvatarPosition>()

  const getLatestName = async () => {
    const name = await getName()
    if (!name) {
      // set default
      const newName = 'I am here'
      await setName(newName)
      setDisplayName(newName)
    } else {
      setDisplayName(name)
    }
  }

  const getLatestAvatar = async () => {
    const avatar = await getAvatar()
    if (avatar) {
      setAvatarPosition(avatar)
    }
  }

  getLatestName()
  getLatestAvatar()

  const onClick = () => {
    // TODO Launch dialog for edit
  }

  return (
    <Navbar.Item>
      <span className={styles.wrapper} onClick={onClick}>
        <Text h2>{displayName}</Text>
        <Avatar {...avatarPosition} />
      </span>
    </Navbar.Item>
  )
}

export { Profile }
