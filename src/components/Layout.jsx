
import React, { useState } from 'react'
import NavBar from './NavBar'
import styles from './layout.module.scss'
import NewMomment from './NewMomment'
import LoginModal from './LoginModal'
import addMemo from '../assets/addComment.svg'
const Layout = (props) => {
  const [loginModal, setLoginModal] = useState(true)
const [newMomment, setNewMomment] = useState(true)
  return (
    <div className={styles.wrapper}>
      {/* {loginModal && <LoginModal/>} */}
      {/* { newMomment && <NewMomment/>} */}
      <button className={styles.addMemo}>
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
