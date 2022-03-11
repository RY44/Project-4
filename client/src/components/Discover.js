import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage, userIsAuthenticated, getPayload } from './helper/authHelper.js'
import { useNavigate } from 'react-router-dom'

const Discover = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  const [posts, setPosts] = useState([])
  const [filPosts, setFilPosts] = useState([])
  const [post, setPost] = useState()

  useEffect(() => {
    !userIsAuthenticated() && navigate('/login') 
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
        // console.log('Current user -->',data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
    getCurentUser()
  },[])

  useEffect(() => {    
    filterPosts()
  }, [posts, currentUser])

  useEffect(() => {
    onePost()
    console.log('Fil posts -->', filPosts)
  }, [filPosts])

  const filterPosts = () => {
    let filArr = []
    posts.forEach(post => {
      if (post.owner !== currentUser.id) {
        filArr.push(post)
        console.log('Post -->', post)
        console.log('Current user -->', currentUser.id)
      }
    })
    setFilPosts(filArr)
  }

  const onePost = () => {
      let ranPost = filPosts[Math.floor(Math.random() * filPosts.length)]
      // console.log('Ran post -->' , ranPost)
      setPost(ranPost)    
      // console.log('Posts -->', filPosts)
    }

  useEffect(() => {
    // console.log('Display Post -->', post)    
  }, [post])

  const startConvo = async () => {
    const form = { test: "test", post: post.id, owner: currentUser.id}
    // console.log('Conversation Form -->',form)
    try {
      const { data } = await axios.post('/api/conversation/', form, {
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
      <div className="discover block fixed">
        <div className="post-display" key={post.owner}>
          <p className="block fixed">{post.post_text}</p>
        </div>
        <div className="button-container">
          <button className="block inline skip"onClick={onePost}>Skip</button>
          <button className="block inline start" onClick={startConvo}>Start Convo</button>
          <button className="block inline post round" onClick={makePost}>Make post</button>
        </div>
      </div>  
    </>
      :
      <div className="discover block fixed">
        <p>No post</p>
      </div>
      }
    </>
  )
}

export default Discover

// ! Bugs
// when creating new convo on post state for formData hasn't rendered yet so takes two clicks to make success post request