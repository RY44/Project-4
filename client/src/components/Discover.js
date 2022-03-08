import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage, userIsAuthenticated, getPayload } from './helper/authHelper.js'
import { useNavigate } from 'react-router-dom'

const Discover = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState()
  const [formData, setFormData] = useState({
    post: 0,
    owner: 0 
  })

  useEffect(() => {
    !userIsAuthenticated() && navigate('/') 
    const getPosts = async () => {
      try {
        const { data } = await axios.get('/api/post/')
        setPosts(data)
      } catch (error) {
        console.log(error)
      }
    }
    const getCurentUser = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/auth/user/${payload.sub}/`)
        setCurrentUser(data)
        console.log('Current user -->',data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
    getCurentUser()
  },[])

  useEffect(() => {    
    onePost()
  }, [posts])

  const onePost = () => {
      let ranPost = posts[Math.floor(Math.random() * posts.length)]
      // posts.splice(ranPost, 1)
      setPost(ranPost)
      console.log('Posts -->', posts)
    }

  useEffect(() => {
    console.log('Display Post -->', post)    
  }, [post])

  const startConvo = async () => {
    const form = {...formData, test: "test", post: post.id, owner: currentUser.id}
    setFormData(form)
    console.log('Conversation Form -->',formData)
    try {
      const { data } = await axios.post('/api/conversation/', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      navigate(`/conversation/${data.id}/`)
    } catch (error) {
      console.log(error)
    }
  }

  const makePost = () => {
    navigate('/makepost')
  }

  return (
    <>    
    {post ?
    <>
      <div className="post-display" key={post.owner}>
      <p>{post.post_text}</p>
      </div>
      <button onClick={onePost}>Skip</button>
      <button onClick={startConvo}>Start Convo</button>
      <button onClick={makePost}>Make post</button>
    </>
      :
      <p>No post</p>}
    </>
  )
}

export default Discover

// ! Bugs
// when creating new convo on post state for formData hasn't rendered yet so takes two clicks to make success post request