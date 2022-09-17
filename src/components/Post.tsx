import React from 'react'
import { Box } from '@mui/system'
import { createPost, createPostTypedData } from '../services/PostService'

import { Button } from '@mui/material'
import useAccount from '../hooks/useAccount'
import { createFollowTypedData } from '../services/FollowService'
import { getAddressFromSigner, signedTypeData, splitSignature } from '../services/EtherService'
import { lensHub } from '../services/lensHub'
// import { uploadToIpfs } from '../services/IpfsService'

const Post: React.FC = () => {
  const { profile } = useAccount()

  const handlePost = async () => {
<<<<<<< HEAD
    // try {
    //   const contentUri = await uploadToIpfs()
    //   console.log(contentUri)
    //   await createPost(profile!.id, contentUri)
    // } catch (error) {
    //   console.log(error)
    // }
=======
    /*   try {
      const contentUri = await uploadToIpfs()
      console.log(contentUri)
      await createPost(profile!.id, contentUri)
    } catch (error) {
      console.log(error)
    } */
>>>>>>> 4b05caed3130d930df172c581c1555c8a44bf0df
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
