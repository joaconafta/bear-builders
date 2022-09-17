import React from 'react'
import { Box, Typography } from '@mui/material'
import useAccount from '../hooks/useAccount'
import FilstersBox from '../components/filtersBox'
import DisplayHome from '../components/DisplayHome'
import Post from '../components/Post'
import Comment from '../components/Comment'
const Home= () => {
  const { profile } = useAccount()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
        <Typography variant="h6">{profile? profile.handle : "Sin perfil"}</Typography>

      <FilstersBox/>
      <DisplayHome/>
      <Post/>
      <Comment/>
    </Box>
  )
}

export default Home
