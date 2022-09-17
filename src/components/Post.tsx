import React from 'react'
import { Box } from '@mui/system'
import { createPost } from '../services/PostService'
import { follow } from '../services/FollowService'
import { Button } from '@mui/material'

const Post: React.FC = () => {

  const handlePost = async () => {
    await createPost()
  }
  const handleFollow = async () => {
    await follow('0x46ba')
  }

  return (
    <Box >
      Post:
        <Button onClick={() => handlePost()}>Create Post</Button>
      Follow:
        <Button onClick={() => handleFollow()}>Follow</Button>
    </Box>
  )
}

export default Post
