import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import './App.css'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import MyProfile from './MyProfile'
import IndividualProfile from './IndividualProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/indprofile/:id" element={<IndividualProfile />} />
      </Routes>
    </>
  )
}

export default App
