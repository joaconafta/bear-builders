import React from 'react'
import styles from './displayHome.module.scss'
const DisplayHome = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.featuredFeed}>

            </div>
            <div className={styles.feed}>
                <div className={styles.cardsFeed}>
                    <div className={styles.cardsFeedPic}></div>
                    <div className={styles.cardsFeedTitle}></div>
                    <div className={styles.cardsFeedDesc}></div>
                </div>
            </div>
        </div>
    )
}

export default DisplayHome