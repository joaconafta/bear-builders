import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './memoDetail.module.scss'
import { Rating } from '@mui/material'
import Previews from '../components/Previews'
import StarModal from '../components/StarModal'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { getPublication } from '../services/PostService'
import styles2 from '../components/previews.module.scss'
import PostCard from '../components/PostCard'

const MemoDetail = () => {
  const [starModal, setStarModal] = useState(false)
  const [post, setPost] = useState({})
  let { id } = useParams()

  useEffect(() => {
    const fetch = async () => {
      await handlePostById()
    }

    fetch()
  }, [])


  const handlePostById = async () => {
    try {
      const a = (await getPublication(id)).data.publication
      setPost(a)
    } catch (error) {
      console.log(error)
    }
  }

  const handleStarModal = () => setStarModal(!starModal)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', padding: 2, marginTop: '10vh' }}>
      <div className={styles.wrapper}>
        {starModal && <StarModal handleModal={handleStarModal} />}
        <div className={styles.profileHeader}>
          <div className={styles.profilePic}></div>

          <div>
            <p>{post?.metadata?.name}</p>
          </div>
          <div>
            <button onClick={handleStarModal}>Star This</button>
            <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} size="large" className={styles.starSize} />
          </div>
          <div className="desc">
            <p>{post?.metadata?.content}</p>
            <div>
              <p>
                Created by <span>{post?.profile?.handle}</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles2.container}>
          <PostCard content={post?.metadata?.content} profile={post?.profile} title={post?.metadata?.name} post={post}></PostCard>
        </div>
      </div>
    </Box>
  )
}

export default MemoDetail
