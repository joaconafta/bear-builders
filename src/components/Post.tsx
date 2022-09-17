import React from 'react'
import { Box } from '@mui/system'
import { createPost, createPostTypedData } from '../services/PostService'

import { Button } from '@mui/material'
import useAccount from '../hooks/useAccount'
import { createFollowTypedData } from '../services/FollowService'
import { getAddressFromSigner, signedTypeData, splitSignature } from '../services/EtherService'
import { lensHub } from '../services/lensHub'

const Post: React.FC = () => {
  const { profile } = useAccount()

  const handlePost = async () => {
    await createPost(profile!.id, 'ipfs://QmQgv6rWdBe28fiqxkC88LTPKYHGVHp2Y9DvSF35tRgk4M')
  }

  const handleFollow = async () => {
    /*  await follow('0x46ba') */
  }

  return (
    <Box>
      Post:
      <Button onClick={() => handlePost()}>Create Post</Button>
      Follow:
      <Button onClick={() => handleFollow()}>Follow</Button>
    </Box>
  )
}

export default Post
