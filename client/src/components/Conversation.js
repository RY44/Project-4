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
  const [ postTopic, setPostTopic ] = useState('')
  const [ formData, setFormData ] = useState({
    comment: "",
    conversation: 0,
    owner: 0
  })

  useEffect(() => {
    !userIsAuthenticated() && navigate('/') 
    const getConversation = async () => {
      try {
        const { data } = await axios.get(`/api/conversation/${id}/`)
        console.log('Convo data -->', data)
        setConvo(data)
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
        console.log('Post data -->', data)
        setPostTopic(data.post_text)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  },[convo])

  useEffect(() => {
    console.log('Comments state -->', comments)  
    // console.log('Comment owner -->', comments[1].owner)
  }, [comments])

  const addComment = async (e) => {
    e.preventDefault()
    const form ={...formData, conversation: convo.id, owner: currentUser.id }
    setFormData(form)
    console.log('Comment form -->', form)
    try {
      const { data } = await axios.post('/api/comment/', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      navigate('/discover')
    } catch (error) {
      console.log(error)
    }
  }

  const changeComment = (e) => {
    const userInput = e.target.value
    const form ={...formData, comment: userInput }
    setFormData(form)
  }

  return (
    <>  
    {convo ?
    <>
      {postTopic ? <h1>{postTopic}</h1> : <h1>This is where the post question goes</h1>}      
      {comments ?
      <>
        <h4>Messages</h4>        
        <ul className="comment-list">
          {comments.map((comment,index) => {
            return (
              <div className="comment-display" key={index}>
                <p>{comment.comment}</p>
                {currentUser.id === comment.owner.id ? <p>`posted by you</p> : <p>Posted by other user </p> }
              </div>
            )
          })}
        </ul>
      </>  
      :
      <>
        <p>No messages yet</p>
      </>
      }
      <form className="comment-input">
        <p>Send your message</p>
        <input onChange={changeComment} type="text" placeholder="type here..." />
        <button onClick={addComment}className="comment-button">Send</button>
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