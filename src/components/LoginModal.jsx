import React from 'react'
import styles from './loginModal.module.scss'
import Logo from '../assets/starlesLogoEx.png'
import WalletIcon from '../assets/walletIcon.svg'
const LoginModal = () => {
  return (
    <div className={styles.modalContainer}>
        <div className={styles.modal}>
    <img src={Logo} alt=""  width='300'/>
    <button className={styles.button}>Connect your Wallet <img src={WalletIcon} alt="" /></button>
        </div>

    </div>
  )
}

export default LoginModal