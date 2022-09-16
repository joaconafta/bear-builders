import React from 'react'
import styles from './profileDetail.module.scss'
import { Rating } from '@mui/material'
const ProfileDetail = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePic}>

        </div>
        
          <div><p>Joaquin Naftaly</p></div>
          <div><Rating name="half-rating" defaultValue={2.5} precision={0.5}  size='large' className={styles.starSize}/></div>
     
      </div>
    </div>
  )
}

export default ProfileDetail