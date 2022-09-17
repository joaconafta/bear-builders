import React from 'react'
import { Box } from '@mui/system'
import { createPost } from '../services/PostService'
import { follow } from '../services/FollowService'
import { Button } from '@mui/material'
import useAccount from '../hooks/useAccount'

const Post: React.FC = () => {
  const { profile } = useAccount()
  
  const handlePost = async () => {
    await createPost(profile!.id)
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
