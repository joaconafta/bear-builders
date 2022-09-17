import React, { useState, useEffect } from 'react'
import styles from './displayHome.module.scss'
import { Rating } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getRecommendedProfiles } from '../services/ApoloService'

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
                <h2>Recommended Profiles</h2>
                <div className={styles.featuredFeed}>
                    {data.map((prof, i) => {     
                        const image = prof.picture ? prof.picture.original.url : ''
                        console.log(image)
                        // Return the element. Also pass key     
                        return (
                            <div className={styles.profile}  >

                                <div className='picCard' nClick={() => navigate(`/profiles/${prof.id}`)} style={{ background : `url(${image})`}}>
                                    
                                </div>
                                <div className={styles.featuredProf} >
                                    <p onClick={() => navigate(`/profiles/${prof.id}`)}>{prof.handle}</p>
                                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                </div>

                            </div>
                        ) 
                        })}
                    
                </div>

            </div>

            <div className={styles.commonFeed}>
                <h2>Last Posts</h2>
                <div className={styles.featuredFeed}>
                    <div className={styles.cardsFeed}>
                        <div className={styles.cardsFeedPic} onClick={() => navigate(`/profiles/${'id'}`)}>
                            <div>

                            </div>
                            <p >Joaquin Naftaly</p>
                        </div>
                        <div className={styles.cardsFeedTitle}>

                            <p onClick={() => navigate(`/memo/${'id'}`)}>Bear-Hackathon</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                        <div className={styles.cardsFeedDesc}>
                            <p>Muy buen evento, bien organizado, mucha comida, las oficinas estaban muy buenas, volveria a participar.</p>
                        </div>
                    </div>
                    <div className={styles.cardsFeed}>
                        <div className={styles.cardsFeedPic}>
                            <div>

                            </div>
                            <p>Joaquin Naftaly</p>
                        </div>
                        <div className={styles.cardsFeedTitle}>

                            <p>Bear-Hackathon</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                        <div className={styles.cardsFeedDesc}>
                            <p>Muy buen evento, bien organizado, mucha comida, las oficinas estaban muy buenas, volveria a participar.</p>
                        </div>
                    </div>
                    <div className={styles.cardsFeed}>
                        <div className={styles.cardsFeedPic}>
                            <div>

                            </div>
                            <p>Joaquin Naftaly</p>
                        </div>
                        <div className={styles.cardsFeedTitle}>

                            <p>Bear-Hackathon</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                        <div className={styles.cardsFeedDesc}>
                            <p>Muy buen evento, bien organizado, mucha comida, las oficinas estaban muy buenas, volveria a participar.</p>
                        </div>
                    </div>
                    <div className={styles.cardsFeed}>
                        <div className={styles.cardsFeedPic}>
                            <div>

                            </div>
                            <p>Joaquin Naftaly</p>
                        </div>
                        <div className={styles.cardsFeedTitle}>

                            <p>Bear-Hackathon</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                        <div className={styles.cardsFeedDesc}>
                            <p>Muy buen evento, bien organizado, mucha comida, las oficinas estaban muy buenas, volveria a participar.</p>
                        </div>
                    </div>
                    <div className={styles.cardsFeed}>
                        <div className={styles.cardsFeedPic}>
                            <div>

                            </div>
                            <p>Joaquin Naftaly</p>
                        </div>
                        <div className={styles.cardsFeedTitle}>

                            <p>Bear-Hackathon</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                        <div className={styles.cardsFeedDesc}>
                            <p>Muy buen evento, bien organizado, mucha comida, las oficinas estaban muy buenas, volveria a participar.</p>
                        </div>
                    </div>
                    <div className={styles.cardsFeed}>
                        <div className={styles.cardsFeedPic}>
                            <div>

                            </div>
                            <p>Joaquin Naftaly</p>
                        </div>
                        <div className={styles.cardsFeedTitle}>

                            <p>Bear-Hackathon</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                        <div className={styles.cardsFeedDesc}>
                            <p>Muy buen evento, bien organizado, mucha comida, las oficinas estaban muy buenas, volveria a participar.</p>
                        </div>
                    </div>
                    <div className={styles.cardsFeed}>
                        <div className={styles.cardsFeedPic}>
                            <div>

                            </div>
                            <p>Joaquin Naftaly</p>
                        </div>
                        <div className={styles.cardsFeedTitle}>

                            <p>Bear-Hackathon</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                        <div className={styles.cardsFeedDesc}>
                            <p>Muy buen evento, bien organizado, mucha comida, las oficinas estaban muy buenas, volveria a participar.</p>
                        </div>
                    </div>
                    <div className={styles.cardsFeed}>
                        <div className={styles.cardsFeedPic}>
                            <div>

                            </div>
                            <p>Joaquin Naftaly</p>
                        </div>
                        <div className={styles.cardsFeedTitle}>

                            <p>Bear-Hackathon</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                        <div className={styles.cardsFeedDesc}>
                            <p>Muy buen evento, bien organizado, mucha comida, las oficinas estaban muy buenas, volveria a participar.</p>
                        </div>
                    </div>
                    <div className={styles.cardsFeed}>
                        <div className={styles.cardsFeedPic}>
                            <div>

                            </div>
                            <p>Joaquin Naftaly</p>
                        </div>
                        <div className={styles.cardsFeedTitle}>

                            <p>Bear-Hackathon</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                        <div className={styles.cardsFeedDesc}>
                            <p>Muy buen evento, bien organizado, mucha comida, las oficinas estaban muy buenas, volveria a participar.</p>
                        </div>
                    </div>
                    <div className={styles.cardsFeed}>
                        <div className={styles.cardsFeedPic}>
                            <div>

                            </div>
                            <p>Joaquin Naftaly</p>
                        </div>
                        <div className={styles.cardsFeedTitle}>

                            <p>Bear-Hackathon</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                        <div className={styles.cardsFeedDesc}>
                            <p>Muy buen evento, bien organizado, mucha comida, las oficinas estaban muy buenas, volveria a participar.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayHome