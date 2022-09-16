import React from 'react'
import { Box, Typography } from '@mui/material'
import useAccount from '../hooks/useAccount'
import FilstersBox from '../components/filtersBox'
import DisplayHome from '../components/DisplayHome'
import Post from '../components/Post'
const Home= () => {
  const { jsonToken } = useAccount()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
      <FilstersBox/>
      <DisplayHome/>
      <Post/>
    </Box>
  )
}

export default Home
