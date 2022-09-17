
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
      {/* {loginModal && <LoginModal/>} */}
      { newMomment && <NewMomment handleModal={handleModalComments} isProfile={isProfile}/>}
      <button className={styles.addMemo} onClick={handleModalComments}>
      <img src={addMemo} alt="" />
      </button>
      
      <NavBar />
      <main>
        {props.children}
      </main>
      <footer>
        footer
      </footer>
    </div>
  )
}

export default Layout
