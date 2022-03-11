import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link  } from 'react-router-dom'
// import { userIsAuthenticated } from '../components/helper/authHelper.js'


const Login = () => {
  const navigate = useNavigate()
  const [formError, setFormError] = useState('False')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormError('False')
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
      setFormError('True')      
    }
  }

  useEffect(() => {
    console.log('Form error -->', formError)
  }, [formError])

  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit} className = "wrapper block fixed auth-form">
        <div className="input-block">
          <p>Email</p>
          <input onChange={handleChange} className="block" type="text" name="email" placeholder="enter email here..." />         
        </div>
        <div className="input-block">
          <p>Password</p>
          <input onChange={handleChange} className="block" type="password" name="password" placeholder="enter password here..." />
        </div>
        {formError === 'True' && <p className="error">Check email or password</p>}
        {!formData.email || !formData.password || formError === 'True' ? <button disabled className="block fixed butt disabled">Login</button> : <button className="block butt">Login</button>}        
        <Link className="link" to={"../register"}><p>don't have an account?</p></Link>
      </form>
    </div>
    </>
  )

}

export default Login