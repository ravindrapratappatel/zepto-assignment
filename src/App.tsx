import React from 'react'
import userList from './items/items'
import UserCard from './components/UserCard'
import ChipCard from './components/ChipCard'

const App: React.FC = () => {
  const [searchText, setsearchText] = React.useState<string>('')
  const [selectedUsers, setSelectedUsers] = React.useState<number[]>([])
  const [filteredUserList, setfilteredUserList] = React.useState(userList)

  const [bgColor, setbgColor] = React.useState<string>('bg-while') // set background color
  const [toBeDeletedItemId, settoBeDeletedItemId] = React.useState<number>()
  const [count, setcount] = React.useState<number>(1)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setsearchText(event.target.value)
  }

  // function to select the user
  const handleClick = (id: number): void => {
    if (!selectedUsers.includes(id)) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, id])
      setfilteredUserList((prevFilteredUserList) =>
        prevFilteredUserList.filter((user) => user.id !== id)
      )
    }
  }

  // function to remove to user from selected list
  const handleRemoveUser = (id: number): void => {
    setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((userId) => userId !== id))
    const removedUser = userList.find((user) => user.id === id)
    setfilteredUserList((prevFilteredUserList) =>
      removedUser !== undefined ? [...prevFilteredUserList, removedUser] : prevFilteredUserList
    )
  }

  // function to handle to backspace event and ArrowRight
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace') {
      if (searchText === '') {
        settoBeDeletedItemId(selectedUsers[selectedUsers.length - 1])
        setbgColor('bg-red-500')
        setcount(count + 1)
      }
      if (count === 2) {
        setSelectedUsers((prev) => {
          const newSelectedUsers = [...prev]
          newSelectedUsers.pop()
          setcount(1)
          settoBeDeletedItemId(-1)
          return newSelectedUsers
        })
      }
    }
    if (e.key === 'ArrowRight') {
      settoBeDeletedItemId(-1)
      setbgColor('bg-white')
      setcount(1)
    }
  }

  React.useEffect(() => {
    if (searchText === '') {
      setfilteredUserList(userList)
      return
    }
    // filter the list based on input
    const tempList = userList.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    )
    // remove the item from the list that are selected
    const List = tempList.filter((user) => !selectedUsers.includes(user.id))
    setfilteredUserList(List)
  }, [searchText, selectedUsers])

  return (
    <div className={main}>
      <p className={text}>Add User</p>
      <div className={container}>
        {selectedUsers.length > 0 && (
          <div className={ChipCardDiv}>
            {selectedUsers.map((userId) => {
              const selectedUser = userList.find((user) => user.id === userId)
              return (
                <div
                  className={`${
                    toBeDeletedItemId === userId ? bgColor : ''
                  } border rounded-full `}
                  key={userId}
                >
                  <ChipCard
                    user={selectedUser}
                    onClick={() => {
                      handleRemoveUser(userId)
                    }}
                  />
                </div>
              )
            })}
          </div>
        )}
        <input
          className={inputFieldStyle}
          id="username"
          type="text"
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          placeholder="Add New User....."
        />
      </div>

      { (searchText.length > 0) && (
        <div className={listDivStyle}>
          {filteredUserList.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => {
                handleClick(user.id)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const main: string = `p-4 text-center`
const text: string = 'text-2xl mb-2 font-bold'
const container: string = `flex flex-row w-full flex-wrap border-b p-3`
const ChipCardDiv: string = `ml-2 flex flex-row flex-wrap gap-2`
const inputFieldStyle: string = `py-2 px-3 text-gray-700 leading-tight focus:outline-none appearance-none focus:shadow-outline`
const listDivStyle: string = `w-fit mx-auto p-4 border max-h-48 overflow-y-auto`

export default App
