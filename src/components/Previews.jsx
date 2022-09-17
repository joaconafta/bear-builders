import React, { useState, useEffect } from 'react'
import styles from './previews.module.scss'
import { Rating } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { getPublications } from '../services/PostService'
import useAccount from '../hooks/useAccount'
import PostCard from './PostCard'
const Previews = ({type, data}) => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState([])
  const { profile } = useAccount()
  useEffect(() => {
      const init = async () => {
        let a
        setTimeout(async () => {
          if(type === 'post'){
            a = (await getPublications(id)).data.publications.items   
            setItem([...a]) 
          }
        }, 500);
      }
      init()
  }, [id])
  
  return (
    <div className={styles.container}>
    {item.map((post, i) => {  
    
    return <PostCard content={post.metadata.content} profile={post.profile} title={post.metadata.name}></PostCard>
    })}
    </div>
  )
}

export default Previews