import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage, userIsAuthenticated, getPayload } from './helper/authHelper.js'

const Conversation = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ convo, setConvo ] = useState({})
  const [ comments, setComments ] = useState([])
  const [ currentUser, setCurrentUser ] = useState({})
  const [ otherUser, setOtherUser ] = useState({})
  const [ postTopic, setPostTopic ] = useState('')
  const [ formData, setFormData ] = useState({
    comment: "",
    conversation: 0,
    owner: 0
  })

  const getConversation = async () => {
      try {
        const { data } = await axios.get(`/api/conversation/${id}/`)
        // console.log('Convo data -->', data)
        setConvo(data)
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    !userIsAuthenticated() && navigate('/login')     
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
    getConversation()
    getCurrentUser()
  },[])

  useEffect(() => {
    // console.log('Comments -->', convo.comment)
    let commentsArr = convo.comment
    console.log('Comments -->', commentsArr)
    setComments(commentsArr)
    const getPost = async () => {
      try {
        const { data } = await axios.get(`/api/post/${convo.post}`)
        // console.log('Post data -->', data)
        setPostTopic(data.post_text)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  },[convo])

  useEffect(() => {
    const getOtherUser = async () => {
      let val = 0
      comments.forEach(comment => {
        // console.log('Comment id -->', comment.owner)
        // console.log('User id -->', currentUser.id)
        if (comment.owner !== currentUser.id) {
          val = comment.owner
        } 
        return val       
      })
      // console.log('Val -->', val)
      try {
        const { data } = await axios.get(`/api/auth/user/${val}/`)
        console.log('Data -->', data)
        setOtherUser(data)
      } catch (error) {
        console.log(error)
      }
    }
    getOtherUser()
  }, [currentUser, comments])

  const addComment = async (e) => {
    e.preventDefault()
    const form = {...formData,  conversation: convo.id, owner: currentUser.id }
    // console.log('Comment form -->', form)
    try {
      const { data } = await axios.post('/api/comment/', form, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      document.querySelector('#message').value = ''
      getConversation()
    } catch (error) {
      console.log(error)
    }
  }

  const changeComment = (e) => {
    const userInput = e.target.value
    const form ={...formData, comment: userInput }
    setFormData(form)
  }

  const deletePost = async (e) => {
    navigate('/myconversations')
      try {
        const { data } = await axios.delete(`/api/conversation/${id}/`, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        })
        
      } catch (error) {
        console.log(error)
      }
      
    }

  return (
    <>  
    {convo ?
    <>
      {postTopic ? <h4 className="card block fixed">{postTopic}</h4> : <h4 className="card block fixed">This is where the post question goes</h4>}      
      {comments ?
      <>
      <div className="card grey-card block fixed">
        <h4>Messages</h4>        
        <ul className="comment-list">
          {comments.map((comment,index) => {
            return (
              <>
              {currentUser.id === comment.owner ? 
              <div className="comment-display your-message block fixed" key={index}>
                <p>{comment.comment}</p>
                <p className="smaller-text">Posted by you</p>
              </div>
              :
              <div className="comment-display other-message block fixed" key={index}>
                <p>{comment.comment}</p>
                <p className="smaller-text">Posted by {otherUser.username}</p>
              </div>
              }
              </>
            )
          })}
        </ul>
      </div>  
      </>  
      :
      <>
      </>
      }
      <form className="card block fixed">
        <p>Send your message</p>
        <input id="message" className="block" onChange={changeComment} type="text" placeholder="type here..." />
        <div className="button-container">
          <button className="block" onClick={addComment}>Send</button>
          <button className="block red" onClick={deletePost} >Delete convo</button>
        </div>
      </form>
      </>
      :
      <>
        <p>No conversation</p>
      </>
      }
      </>
  )
}

export default Conversation

// ! Bugs
// can't figure out how to get it to show owner of messages 