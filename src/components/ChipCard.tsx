// chipcard component
import { User } from '../items/items'
import React, { MouseEventHandler } from 'react'
import { FaTimes } from 'react-icons/fa'

interface UserCardProps {
  user?: User
  onClick?: MouseEventHandler
}

const ChipCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div className={mainContainer}>
      <div className={profile}> {user?.name[0].toUpperCase()} </div>
      <div className={name}>{user?.name}</div>
      <FaTimes size={20} className={cancelIcon} onClick={onClick} />
    </div>
  )
}

const mainContainer = `px-2 flex gap-1 py-2 cursor-pointer border rounded-full`
const profile: string = `w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-black font-semibold`
const name: string = `font-semibold self-center`
const cancelIcon = `self-center`

export default ChipCard
