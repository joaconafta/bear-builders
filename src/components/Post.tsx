import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { createPost, explorePublications } from '../services/PostService'
import styles from './displayHome.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Rating } from '@mui/material'
import useAccount from '../hooks/useAccount'
import { createFollowTypedData } from '../services/FollowService'
import { getAddressFromSigner, signedTypeData, splitSignature } from '../services/EtherService'
import { lensHub } from '../services/lensHub'
// import { uploadToIpfs } from '../services/IpfsService'
import { uploadToIpfs } from '../services/IpfsService'

const Post: React.FC = () => {
  const { profile } = useAccount()
  const [latestPost, setLatestPost] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      await handleLatestPublications()
    }

    fetch()
  }, [])

  const handlePost = async () => {
    // try {
    //   const contentUri = await uploadToIpfs()
    //   console.log(contentUri)
    //   await createPost(profile!.id, contentUri)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const handleLatestPublications = async () => {
    try {
      setLatestPost((await explorePublications()).data?.explorePublications?.items)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollow = async () => {
    /*  await follow('0x46ba') */
  }

  return (
    <>
      <>
        <div className={styles.commonFeed}>
          <h2>Last Posts</h2>
          <div className={styles.featuredFeed}>
            {latestPost?.map((post: any, i) => {
              return (
                <div className={styles.cardsFeed} key={i}>
                  <div className={styles.cardsFeedPic} onClick={() => navigate(`/profiles/${post.profile.id}`)}>
                    <div></div>
                    <p>{post.profile.handle}</p>
                  </div>
                  <div className={styles.cardsFeedTitle}>
<<<<<<< HEAD
                    <p onClick={() => navigate(`/memo/${'id'}`)}>{post.metadata.name}</p>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} />
=======
                    <p onClick={() => navigate(`/memo/${post.id}`)}>{post.metadata.name}</p>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
>>>>>>> ef9c8e5671c1b012fe0a0f32f27cf7a5bdbb3ab3
                  </div>
                  <div className={styles.cardsFeedDesc}>
                    <p>{post.metadata.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    </>
  )
}

export default Post
