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
    <div className="container">
      <form onSubmit={handleSubmit} className = "wrapper block fixed auth-form">
        <div className="input-block">
          <p>Username</p>
          <input className="block" onChange={handleChange} type="text" name="username" placeholder="enter username here..." maxLength="10" />          
        </div>
        <div className="input-block">
          <p>Email</p>
          <input className="block" onChange={handleChange} type="text" name="email" placeholder="enter email here..." />
          {formData.email.length && !formData.email.includes("@") ? <p className="error">Please enter valid email</p> : <></>}
        </div>
        <div className="input-block">
          <p>Password</p>
          <input className="block" onChange={handleChange} type="password" name="password" placeholder="enter password here..." />
        </div>
        <div className="input-block">
          <p>Password Confirmation</p>
          <input className="block" onChange={handleChange} type="password" name="password_confirmation" placeholder="renter password here..." />
          {formData.password.length && formData.password_confirmation.length && formData.password !== formData.password_confirmation ? <p className="error">Passwords do not match!</p> : <></>}
        </div>
        {!formData.email || !formData.password || !formData.username || formData.password !== formData.password_confirmation  ? <button disabled className="block fixed butt disabled">Submit</button> : <button className="block butt">Submit</button>}
        <Link className="link" to={"../login"}><p>already have an account?</p></Link>
      </form>
    </div>
    </>
  )
}

export default Register
