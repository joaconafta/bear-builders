
import React, { useState } from 'react'
import NavBar from './NavBar'
import styles from './layout.module.scss'
import NewMomment from './NewMomment'
import LoginModal from './LoginModal'
import addMemo from '../assets/addComment.svg'
const Layout = (props) => {
  const [loginModal, setLoginModal] = useState(true)
const [newMomment, setNewMomment] = useState(false)
const [isProfile, setIsProfile] = useState(false)

const handleModalComments = () => setNewMomment(!newMomment)
  return (
    
    <div className={styles.wrapper}>
      <div class='ripple-background'>
  <div class='circle xxlarge shade1'></div>
  <div class='circle xlarge shade2'></div>
  <div class='circle large shade3'></div>
  <div class='circle mediun shade4'></div>
  <div class='circle small shade5'></div>
</div>
      {/* {loginModal && <LoginModal/>} */}
      { newMomment && <NewMomment handleModal={handleModalComments} isProfile={isProfile}/>}
      <button className={styles.addMemo} onClick={handleModalComments}>
      <img src={addMemo} alt="" />
      </button>
      
      <NavBar />
      <main>
        {props.children}
      </main>

    </div>
  )
}

export default Layout
