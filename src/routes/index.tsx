import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import Home from '../pages/Home'

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
