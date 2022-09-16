import React from 'react'
import { Box } from '@mui/system'
import { createPost } from '../services/PostService'
import { Button } from '@mui/material'

const Post: React.FC = () => {

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

export default Post
