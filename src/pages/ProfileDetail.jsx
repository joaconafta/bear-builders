import React,{useState,useCallback,useEffect} from 'react'
import styles from './profileDetail.module.scss'
import { Rating } from '@mui/material'
import Previews from '../components/Previews'
import { useParams, useNavigate } from 'react-router-dom'
import { getProfile } from '../services/ApoloService'

import {Box} from '@mui/material'
const ProfileDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})
  useEffect(() => {
    
      const init = async () => {
        setTimeout(async () => {
          const prof = (await getProfile(id)).data.profile
          setProfile(prof)
          
        }, 500);
      }
      init()
  }, [id])
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const handleWindowResize = useCallback(event => {

      setScreenWidth(window.innerWidth);
  
  }, []); 

  useEffect(() => {
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, [handleWindowResize]);
  return (
      <div className={styles.wrapper}>
        <div className={styles.profileHeader}>
          <div className={styles.profilePic} style={{ background: `url(${profile.picture ? profile.picture.original.url : "https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX"})`}}>

          </div>
          
  
          <div className={styles.profileHeaderInfo}>
        
          <div >
            <p>{profile?.handle}</p>
          </div>
          
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
              <Rating name="half-rating-read"defaultValue={2.5} precision={0.5}  size='large' className={styles.starSize}/>
              </div>
            
              
            <div className='desc'>
              <p>{profile?.bio}</p>
              {/* <div><button className={styles.button}>Eventos</button><button className={styles.button}>Stars Received</button><button className={styles.button}>Stars Given</button></div> */}
            </div>
        </div>
       
      </div>
      <Previews type={'post'}/>
      </div>

  )
}

export default ProfileDetail