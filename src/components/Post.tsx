import React from 'react'
import { Box } from '@mui/system'
import { createPost } from '../services/PostService'
import { Button } from '@mui/material'
import useAccount from '../hooks/useAccount'

const Post: React.FC = () => {

  const { profile } = useAccount()

  const handlePost = async () => {
    if(!profile) throw new Error('You are not logged')
    await createPost(profile)
  }

  return (
    <Box >
      Post:
        <Button onClick={() => handlePost()}>Create Post</Button>
    </Box>
  )
}

export default Post
