import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import Home from '../pages/Home'
import MemoDetail from '../pages/MemoDetail'
import ProfileDetail from '../pages/ProfileDetail'

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memo/:id" element={<MemoDetail />} />
        <Route path="/profiles/:id" element={<ProfileDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
