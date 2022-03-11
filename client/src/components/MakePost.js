import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link  } from 'react-router-dom'
import { getTokenFromLocalStorage, userIsAuthenticated, getPayload } from './helper/authHelper.js'

const MakePost = () => {
  const [ currentUser,setCurrentUser ] = useState({})
  const navigate = useNavigate()
  const [ formData, setFormData ] = useState({
    post_text: "",
    owner: 0
  })

  useEffect(() => {
    !userIsAuthenticated() && navigate('/') 
    const getCurrentUser = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/auth/user/${payload.sub}/`)
        setCurrentUser(data)
        console.log('Current user -->',data)
      } catch (error) {
        console.log(error)
      }
    }
    getCurrentUser()
  }, [])

  const handleChange = (e) => {
    const form = {...formData, post_text: e.target.value}
    setFormData(form)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = {...formData, owner: currentUser.id}
    console.log('Current user -->' ,currentUser.id)
    setFormData(form)
    try {
      const { data } = await axios.post('/api/post/', form, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      navigate('/discover')
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
    <div className="container">
      <form className="post-form wrapper block fixed">
        <div className="input-block">
          <p>What are you thinking about?</p>
          <input className="block" onChange={handleChange}type="text" name="post_text" placeholder="enter your text..." maxLength='30' />
        </div>
        <button onClick={handleSubmit} className="block butt">Make Post</button>
      </form>
    </div> 
    </>
  )
}

export default MakePost

// ! Bugs
// takes two button clicks to make post