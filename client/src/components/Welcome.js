import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <>
      <div className="auth-links">
        <Link to={"./register"}><p>register</p></Link>
        <Link to={"./login"}><p>login</p></Link>
      </div>
    </>
  )
}

export default Welcome