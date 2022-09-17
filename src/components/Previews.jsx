import React from 'react'
import styles from './previews.module.scss'
import { Rating } from '@mui/material'
const Previews = () => {
  return (
    <div className={styles.container}>
    <div className={styles.title}>Title</div>    
        <div className={styles.card}>
        <div className={styles.cardsFeedPic}>
                    <div>

                    </div>
                
                    </div>
                    <div className={styles.cardsFeedTitle}>

                        <p>Bear-Hackathon</p>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                    </div>
                    <div className={styles.cardsFeedDesc}>
                        <p>Muy buen evento, bien organizado, mucha comida, las oficinas estaban muy buenas, volveria a participar.</p>
                    </div>
        </div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>

    </div>
  )
}

export default Previews