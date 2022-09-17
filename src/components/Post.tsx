import React from 'react'
import { Box } from '@mui/system'
import { createPost } from '../services/PostService'

import { Button } from '@mui/material'
import useAccount from '../hooks/useAccount'
import { createFollowTypedData } from '../services/FollowService'
import { getAddressFromSigner, signedTypeData, splitSignature } from '../services/EtherService'
import { lensHub } from '../services/lensHub'

const Post: React.FC = () => {
  const { profile } = useAccount()

  const handlePost = async () => {
    await createPost()
  }
  const handleFollow = async () => {
    console.log(profile?.id)
    const result = await createFollowTypedData()
    const typedData = result.data.createFollowTypedData.typedData
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value)
    const { v, r, s } = splitSignature(signature)

    const tx = await lensHub.followWithSig({
      follower: getAddressFromSigner(),
      profileIds: typedData.value.profileIds,
      datas: typedData.value.datas,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline
      }
    })
    console.log(tx.hash)
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
