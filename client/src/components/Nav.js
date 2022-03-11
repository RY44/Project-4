import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { getPayload } from './helper/authHelper.js'
import { UserContext } from '../contexts/UserContext'
import logo from '../assets/logo.png'

const Nav = () => {
  const navigate = useNavigate()
  // const [ currentUser, setCurrentUser ] = useState({})
  // const { username, setUsername } = useContext(UserContext)
  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     try {
  //       const payload = getPayload()
  //       const { data } = await axios.get(`/api/auth/user/${payload.sub}/`)
  //       setCurrentUser(data)
  //       // console.log('username -->', data.username)
  //       setUsername(data.username)
  //       // console.log('Current user -->',data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getCurrentUser()
  // }, [])
  
  const handleLogout = () => {
    window.localStorage.removeItem('proj4-token')
    navigate('/')
    // setCurrentUser({
    //   id: 0
    // })
  }
  
  return (
    <>
      <nav>
        <img src={logo} alt="O pin logo" />
        <div>
          <Link to={"./discover"}><p className="block">Discover</p></Link>
          <Link to={"./myconversations"}><p className="block">MyConvos</p></Link>
          <p className="block" onClick={handleLogout}>Logout</p>
        </div>        
      </nav>
      {/* {username ? <p className="current-user">Logged in as {username}</p> : <></> }         */}
    </>
  )
}

export default Nav