import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const Nav = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    window.localStorage.removeItem('proj4-token')
    navigate('/')
  }
  return (
    <>
      <nav>
        {/* <h2>O'pin</h2> */}
        <img src={logo} alt="O pin logo" />
        <div>
          <Link to={"./discover"}><p className="block">Discover</p></Link>
          <Link to={"./myconversations"}><p className="block">MyConvos</p></Link>
          <p className="block" onClick={handleLogout}>Logout</p>
        </div>
      </nav>  
    </>
  )
}

export default Nav