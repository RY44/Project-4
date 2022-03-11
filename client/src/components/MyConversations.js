import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { getTokenFromLocalStorage, userIsAuthenticated, getPayload } from './helper/authHelper.js'

const MyConversations = () => {
  const navigate = useNavigate()
  const [ conversations, setConversations ] = useState([])
  const [ filPosts, setFilPosts ] = useState([])
  const [ currentUser, setCurrentUser ] = useState({})
  const [ posts, setPosts ] = useState([])
  
  // current user - need api request to ger currentUser 
  // my conversations - need api request to get conversations owned by current user
  // my posts - need api request to get posts owned by current user

  useEffect(() => {
    !userIsAuthenticated() && navigate('/login') 
    const getConversations = async () => {
      try {
        const { data } = await axios.get('/api/conversation/', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        })
        console.log('Data -->', data)
        const conversationsWithPostName = data.map(async convo => { 
          console.log('Convo -->', convo)         
          const { data: postData } = await axios.get(`/api/post/${convo.post}`)
          console.log('Post text -->', postData.post_text)
          return {
            ...convo,
            postText: postData.post_text
          }
          
        })      
        const promisedConvos = await Promise.all(conversationsWithPostName)                
        setConversations(promisedConvos)
        console.log('Conversations -->', data)
      } catch (error) {
        console.log(error)
      }
    }
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
        console.log('Current user -->',data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
    getConversations()
    getCurrentUser()
  }, [])

  useEffect(() => {
    console.log('Posts -->', posts)
    console.log('CurrentUserId -->', currentUser.id)
    if (posts.length) {
      let filterArr = []
      posts.forEach(post => {
        console.log('Post owner -->', post.owner)
        if (currentUser.id === post.owner) {
          filterArr.push(post)
        }
      })
      setFilPosts(filterArr)
      console.log('Filtered posts -->', filterArr)
    }
  }, [posts, currentUser] )

  return (
    <>
      {posts && conversations ?
      <>
      <div className="my-conversations">
      <h1 className="block fixed">My Conversations</h1>          
          <div className="my-convos block fixed">
          <h4>My posts</h4>
          {!filPosts.length ? <p className="convo-display block fixed">No posts yet</p> : <> </>}
          {filPosts.map((post, index) => {
            return (
              <>
              {/* <div className="convo-display block" key={post.id}> */}
              {/* make into links */}
                <Link className="convo-display block" key={post.id} to={`../mypost/${post.id}`}><p>{post.post_text}</p></Link>
              {/* </div> */}
              </>
            )
          })}
          </div>          
          <div className="my-convos block fixed">
          <h4>My convos</h4>
          {!conversations.length ? <p className="convo-display block fixed">No convos yet</p> : <> </>}
          {conversations.map((convo, index) => {
            return (
              <>
              {/* <div className="convo-display block" key={convo.id}> */}
              {/* make into links */}
                <Link className="convo-display block" key={convo.id} to={`../conversation/${convo.id}`}><p>{convo.postText}</p></Link>
              {/* </div> */}
              </>
            )
          })}
          </div>
          </div>                  
      </>
      :
      <p>No conversations</p> 
      }
    </>
  )
}

export default MyConversations
