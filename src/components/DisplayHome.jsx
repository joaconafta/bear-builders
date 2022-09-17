import React, { useState, useEffect } from 'react'
import styles from './displayHome.module.scss'
import { Rating } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getRecommendedProfiles } from '../services/ApoloService'
import Post from './Post'
import ResponsiveAppBar from './ProfileCard'

const DisplayHome = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  useEffect(() => {
    const init = async () => {
      const a = (await getRecommendedProfiles()).data.recommendedProfiles
      setData(a)
    }
    init()
  }, [])

  return (
    <div className={styles.layout}>
      <div className={styles.featureds}>
        <h2 >Recommended Profiles</h2>
        <div className={styles.featuredFeed}>
          {data.map((prof, i) => {
            const image = prof.picture ? prof.picture.original.url : "https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX"
            console.log(image)
            // Return the element. Also pass key
            return (
             
              <>
              <ResponsiveAppBar profile={prof}/>
           {/*    <div className={styles.profile} key={i}>
                <div className="picCard" onClick={() => navigate(`/profiles/${prof.id}`)} style={{ background: `url(${image})` }}></div>
                <div className={styles.featuredProf}>
                  <p onClick={() => navigate(`/profiles/${prof.id}`)}>{prof.handle}</p>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                </div>
              </div> */}
              </>
            )
          })}
        </div>
      </div>
      <Post />
    </div>
  )
}

export default DisplayHome
