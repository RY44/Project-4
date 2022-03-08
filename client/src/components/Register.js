import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { userIsAuthenticated } from '../components/helper/authHelper'


const Register = () => {
  const navigate = useNavigate()

  // const [formError, setFormError] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  useEffect(() => {
    userIsAuthenticated() && navigate('/discover')
  }, [])

  // const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    console.log(newObj)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formData)
      navigate('/login')
    } catch (err) {
      console.log(err)
      // setFormError(true)
      // setFormError(err.response.data.message)
      // console.log(formError)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className = "register-form">
        <div className="input-block">
          <p>Username</p>
          <input onChange={handleChange} type="text" name="username" placeholder="enter username here..." />
        </div>
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
        <Link to={"./login"}><p>already have an account?</p></Link>

      </form>
    </>
  )
}

export default Register
