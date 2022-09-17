import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import MemoDetail from '../pages/MemoDetail'
import ProfileDetail from '../pages/ProfileDetail'
import Layout from '../components/Layout'

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memo/:id" element={<MemoDetail />} />
        <Route path="/profiles/:id" element={<ProfileDetail />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Routing
