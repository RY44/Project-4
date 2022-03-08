import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'
import Discover from './components/Discover'
import Conversation from './components/Conversation'
import MakePost from './components/MakePost'
import MyConversations from './components/MyConversations'
import Nav from './components/Nav'

function App() {
  
    return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='discover' element={<Discover />} />
        <Route path='conversation/:id' element={<Conversation />} />
        <Route path='makepost' element={<MakePost />} />
        <Route path='myconversations' element={<MyConversations/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
