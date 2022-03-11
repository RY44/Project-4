import React, {useState} from 'react'
export const UserContext = React.createContext(null)
const initialState = {username: ''}
export const UserContextProvider = props => {
  const [ username, setUsername ] = useState('')
  return ( <UserContext.Provider value={{username, setUsername}} >{props.children}</UserContext.Provider> )
}