import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage, userIsAuthenticated, getPayload } from './helper/authHelper.js'

const MyPostConvos = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ post, setPost ] = useState({})
    const [ currentUser, setCurrentUser ] = useState({})
    
    // need to have axios request for one post
    // need to map through conversations in post to jsx
    // need to make conversations links 

    useEffect(() => {
      !userIsAuthenticated() && navigate('/')
      const getPost = async () => {
        try {
          const { data } = await axios.get(`/api/post/${id}/`)
          // console.log('Post data -->', data)
          setPost(data)
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
      getCurrentUser()
      getPost() 
    }, [])

    const deletePost = async (e) => {
      try {
        const { data } = await axios.delete(`/api/post/${id}/`, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        })
        navigate('/myconversations')
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <>
      <div className="my-conversations">
        <div className="block fixed">
          <p>{post.post_text}</p>
          <button className="block red" onClick={deletePost}>Delete post</button>
        </div>        
        {post.conversation &&
        <div className="my-convos block fixed">
        <h4>My convos</h4>
        {!post.conversation.length ? <p className="convo-display block fixed">No convos yet</p> : <> </>}
        {post.conversation.map((convo, index) => {
          return (
            <>
            <div className="convo-display block" key={index}>
              {/* make into links */}
                <Link to={`../conversation/${convo.id}`}><p>convo {index + 1}</p></Link>
              </div>
            </>
            )
          })}
        </div>
        }     
      </div>
      </>
    )
}

export default MyPostConvos