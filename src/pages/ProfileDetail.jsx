import React,{useState,useCallback,useEffect} from 'react'
import styles from './profileDetail.module.scss'
import { Rating } from '@mui/material'
import Previews from '../components/Previews'
import { useParams, useNavigate } from 'react-router-dom'
import {Box} from '@mui/material'
const ProfileDetail = () => {
  const {profileID} = useParams()
  const navigate = useNavigate()
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', padding: 2, marginTop: '10vh' }}>
    <div className={styles.wrapper}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePic}>

        </div>
        
       
          <div className={styles.profileHeaderInfo}>
            <p>Joaquin Naftaly {screenWidth <= 650 && <Rating name="half-rating" defaultValue={2.5} precision={0.5}  size='large' className={styles.starSize}/>}</p>
            {screenWidth <= 650 && <div className={styles.followers}>
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

        }
            </div>
         
          {screenWidth >= 650 &&  <div> 
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
        }
            
          <div className='desc'>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est voluptate cum iste iure nobis perspiciatis illo nostrum recusandae saepe quia, modi pariatur voluptatem, eligendi quasi. Quidem quae optio cupiditate ab?</p>
            <div><button className={styles.button}>Eventos</button><button className={styles.button}>Stars Received</button><button className={styles.button}>Stars Given</button></div>
          </div>
      </div>
      <Previews type={'post'}/>
    </div>
    </Box>
  )
}

export default ProfileDetail