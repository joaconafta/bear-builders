
import React from 'react'
import NavBar from './NavBar'
import styles from './layout.module.scss'
const Layout = (props) => {



  return (
    <div className={styles.wrapper}>
   
       <NavBar/>

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
