import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <>
      <div className="auth-links block fixed">
        <Link to={"./register"}><p className="block">register</p></Link>
        <Link to={"./login"}><p className="block">login</p></Link>
      </div>
    </>
  )
}

export default Welcome