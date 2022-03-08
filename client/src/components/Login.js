import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link  } from 'react-router-dom'
// import { userIsAuthenticated } from '../components/helper/authHelper.js'


const Login = () => {
  const navigate = useNavigate()
  const [formError, setFormError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    // setFormError('')
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('proj4-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      setTokenToLocalStorage(data.token)
      navigate('/discover')
    } catch (err) {
      console.log(err.response)
      setFormError(err.response.data.message)
      console.log(formError)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} className = "login-form">
      <div className="input-block">
        <p>Email</p>
        <input onChange={handleChange} type="text" name="email" placeholder="enter email here..." />
      </div>
      <div className="input-block">
        <p>Password</p>
        <input onChange={handleChange} type="password" name="password" placeholder="enter password here..." />
      </div>
      <div className="input-block">
        <p>Password Confirmation</p>
        <input onChange={handleChange} type="password" name="password_confirmation" placeholder="renter password here..." />
      </div>
      <button className="submit-button">Submit</button>
      <Link to={"./register"}><p>don't have an account?</p></Link>
    </form>
    </>
  )

}

export default Login