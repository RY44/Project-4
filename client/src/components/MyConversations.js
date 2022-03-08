import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { link } from 'react-router-dom'

const MyConversations = () => {
  const [ conversations, setConversations ] = useState([])
  
  // current user - need api request to ger currentUser 
  // my conversations - need api request to get conversations owned by current user
  // my posts - need api request to get posts owned by current user
  return <h1>Hello</h1>
}

export default MyConversations