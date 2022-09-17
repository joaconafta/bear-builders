import React from 'react'
import styles from './profileDetail.module.scss'
import { Rating } from '@mui/material'
import Previews from '../components/Previews'
import { useParams, useNavigate } from 'react-router-dom'

const ProfileDetail = () => {
  const {profileID} = useParams()
  const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePic}>

        </div>
        
          <div><p>Joaquin Naftaly</p></div>
          <div>
            <div className={styles.followers}>
              <div>
                Followers: 20k
              </div>
              <div>
                Following: 2k
              </div>
              <div>
                <button>Follow</button> 
              </div>
            </div>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5}  size='large' className={styles.starSize}/>
            </div>
          <div className='desc'>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est voluptate cum iste iure nobis perspiciatis illo nostrum recusandae saepe quia, modi pariatur voluptatem, eligendi quasi. Quidem quae optio cupiditate ab?</p>
            <div><button className={styles.button}>Eventos</button><button className={styles.button}>Stars Received</button><button className={styles.button}>Stars Given</button></div>
          </div>
      </div>
      <Previews type={'post'}/>
    </div>
  )
}

export default ProfileDetail