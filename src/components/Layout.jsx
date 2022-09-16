
import React, { useState } from 'react'
import NavBar from './NavBar'
import styles from './layout.module.scss'
import LoginModal from './LoginModal'
const Layout = (props) => {
  const [loginModal, setLoginModal] = useState(true)


  return (
    <div className={styles.wrapper}>
      {/* {loginModal && <LoginModal/>} */}
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
