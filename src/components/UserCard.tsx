//  user list component
import { User } from '../items/items'
import React, { MouseEventHandler } from 'react'

interface UserCardProps {
  user: User
  onClick?: MouseEventHandler
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div onClick={onClick} className={mainContainer}>
      <div className= {profile}> {user?.name[0].toUpperCase()} </div>
        <div className={name}> {user.name} </div>
        <div className={email}> {user.email} </div>
    </div>
  )
}
const mainContainer: string = `px-1 py-1 my-2 flex gap-2 flex-wrap cursor-pointer border-b `
const profile: string = `w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-black font-semibold`
const name: string = `font-semibold self-center`
const email: string = `text-gray-600 self-center`

export default UserCard
