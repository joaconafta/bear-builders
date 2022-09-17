import React, { useEffect, useState } from 'react'
import { explorePublications } from '../services/PostService'
import styles from './displayHome.module.scss'
import { useNavigate } from 'react-router-dom'
import useAccount from '../hooks/useAccount'
import PostCard from './PostCard'
// import { uploadToIpfs } from '../services/IpfsService'

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
                <>
                  <PostCard content={post.metadata.content} profile={post.profile} title={post.metadata.name}></PostCard>
                </>
              )
            })}
          </div>
        </div>
      </>
    </>
  )
}

export default Post
