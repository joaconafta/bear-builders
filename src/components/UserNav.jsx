import React, {useState, useContext} from 'react'
import styles from './userNav.module.scss'
import useAccount from '../hooks/useAccount';

const UserDisplay = () => {
const {address: account, logout, profile } = useAccount()
    const [menu, setMenu] = useState(false)
    const [toggle, setToggle] = useState(false)
    const toggleNav = () => {
      console.log(profile)
        if (!toggle) {
            setMenu(true)
          setTimeout(() => {
            setToggle(true)
          }, 100);
        } else {
            setTimeout(() => {
            
                setMenu(false)
              }, 10)

          setTimeout(() => {
            setToggle(false)
    
          }, 700);
        }}

       
  return (<>
  <img onClick={toggleNav} className={styles.profilePic} src={profile?.picture.original.url}/>
  {toggle &&<nav className={ menu ? styles.profileNav : styles.profileNavOut}>
    <div onClick={()=> (console.log('sad'))}> {account?.slice(0, 5)}...{account?.slice(-5)}</div>
    <div>{`My Profile`}</div>
    <div onClick={logout}>{`LOG OUT`}</div>
  </nav>

  }
  
  </>
    
  )
}

export default UserDisplay