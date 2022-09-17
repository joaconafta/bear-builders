import React, {useState} from 'react'
import styles from './memoDetail.module.scss'
import { Rating } from '@mui/material'
import Previews from '../components/Previews'
import StarModal from '../components/StarModal'
import { useParams } from 'react-router-dom'
const MemoDetail = () => {
const [starModal, setStarModal] = useState(false)
let { memoId } = useParams();

const handleStarModal = () => setStarModal(!starModal)
  return (
    <div className={styles.wrapper}>
      {starModal && <StarModal handleModal={handleStarModal}/>}
    <div className={styles.profileHeader}>
      <div className={styles.profilePic}>

      </div>
      
        <div><p>Bear-Hackaton</p></div>
        <div>
          <button onClick={handleStarModal}>Star This</button>
          <Rating name="half-rating" defaultValue={2.5} precision={0.5}  size='large' className={styles.starSize}/>
          </div>
          <div className='desc'>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est voluptate cum iste iure nobis perspiciatis illo nostrum recusandae saepe quia, modi pariatur voluptatem, eligendi quasi. Quidem quae optio cupiditate ab?</p>
            <div><p>Created by <span>Joaco Naftaly</span></p></div>
          </div>
    </div>
    <Previews/>
  </div>
  )
}

export default MemoDetail