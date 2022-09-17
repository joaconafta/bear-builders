import React from 'react'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import { createComment } from '../services/CommentService'
import useAccount from '../hooks/useAccount'

const Comment: React.FC = () => {

  const { profile } = useAccount()

  const handleComment = async () => {
    if(!profile) throw new Error('You are not logged')
    await createComment(profile.id, "ipfs://QmP9QAeZijDsPFFQQNgZhANWAw64yY87vtUz4AgQF1SZ3M")
  }

  return (
    <Box >
        <Button onClick={() => handleComment()}>Create comment</Button>
    </Box>
  )
}

export default Comment
