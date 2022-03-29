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
    const getCurrentUser = async () => {
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
    getCurrentUser()
  },[])

  useEffect(() => {
    if (posts.length && currentUser.id !== 0) {
      let filterArr = []
      posts.forEach(post => {
        if (currentUser.id !== post.owner) {
          filterArr.push(post)
        }
      })
    setFilPosts(filterArr)
    }    
  }, [posts, currentUser])

  useEffect(() => {
    onePost()
    console.log('Fil posts -->', filPosts)
  }, [filPosts])

  const onePost = (e) => {
    // console.log('e -->', e)
    console.log('fil posts length -->', filPosts.length)
    if ((e === undefined && post) || (!filPosts.length)) return  
    let ranNum = Math.floor(Math.random() * filPosts.length)
    let ranPost = filPosts[ranNum]
    filPosts.splice(ranNum, 1)      
    // console.log('New fil posts -->' , newFilPosts)
    setPost(ranPost) 
    setFilPosts(filPosts)   
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
    {post && filPosts.length > 0 ?
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