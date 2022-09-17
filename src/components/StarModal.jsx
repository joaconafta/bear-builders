import React from 'react'
import styles from './starModal.module.scss'
import { Rating } from '@mui/material'
const StarModal = () => {
  return (
    <div className={styles.modalContainer}>
        <div className={styles.modal}>
            <div className={styles.title}>
                <p>Star This</p>
            </div>
            <div className={styles.valuesDiv}>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5}  size='large' />
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className={styles.buttons}>
                <button>Cancel</button>
                <button>Confirm</button>
            </div>
        </div>

    </div>
  )
}

export default StarModal