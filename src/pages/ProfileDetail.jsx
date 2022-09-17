import React, { useState, useEffect } from 'react'
import styles from './profileDetail.module.scss'
import { Rating } from '@mui/material'
import Previews from '../components/Previews'
import { useParams, useNavigate } from 'react-router-dom'
import { getProfile } from '../services/ApoloService'

const ProfileDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})
  useEffect(() => {
    
      const init = async () => {
        setTimeout(async () => {
          const prof = (await getProfile(id)).data.profile
          console.log('ACA',prof)
          setProfile(prof)
          
        }, 500);
      }
      init()
  }, [])
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePic}>

        </div>
        
          <div><p>{profile?.handle}</p></div>
          <div>
            <div className={styles.followers}>
              <div>
                Followers: {profile?.stats?.totalFollowers}
              </div>
              <div>
                Following: {profile?.stats?.totalFollowing}
              </div>
              <div>
                <button>Follow</button> 
              </div>
            </div>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5}  size='large' className={styles.starSize}/>
            </div>
          <div className='desc'>
            <p>{profile?.bio}</p>
            <div><button className={styles.button}>Eventos</button><button className={styles.button}>Stars Received</button><button className={styles.button}>Stars Given</button></div>
          </div>
      </div>
      <Previews type={'post'}/>
    </div>
  )
}

export default ProfileDetail