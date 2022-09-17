import React, { useState, useEffect } from 'react'
import styles from './previews.module.scss'
import { Rating } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { getPublications } from '../services/PostService'
import useAccount from '../hooks/useAccount'
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
    <div className={styles.title}>Title</div> 
    {item.map((it, i) => {  
    
    return <div className={styles.card} onClick={type === 'post' ? ()=> navigate(`/memo/${'id'}`) : null}>
          <div className={styles.cardsFeedPic}>
            <div>

            </div>
        
          </div>
          <div className={styles.cardsFeedTitle}>

            <p>{it?.metadata?.name}</p>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          </div>
          <div className={styles.cardsFeedDesc}>
              <p>{it?.metadata?.description}</p>
          </div>
          </div>
    })}
    </div>
  )
}

export default Previews