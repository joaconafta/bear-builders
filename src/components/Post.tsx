import React from 'react'
import useAccount from '../hooks/useAccount'
import { Box } from '@mui/system'
import { createPost } from '../services/PostSercice'
import { Button } from '@mui/material'

const LogoutButton: React.FC = () => {

  const handlePost = async () => {
    await createPost()
  }

  return (
    <Box >
      Post:
        <Button onClick={() => handlePost()}>Create Post</Button>
    </Box>
  )
}

export default LogoutButton
