import React, { useState,useContext } from 'react'
import { Drawer, Button, Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, List, TextField } from '@mui/material'
import useAccount from '../hooks/useAccount';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './navBar.module.scss'
import Logo from '../assets/starlensLogo.png'
import LogoutButton from './LogoutButton'
import MetaMaskConnectionButton from './MetaMaskConnectionButton'
import PublicAddressContainer from './PublicAddressContainer'
import UserNav from './UserNav'
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [drawer, setDrawer] = useState({ right: false })
    const navigate = useNavigate()
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setDrawer(open);
    };
    const { isLogged } = useAccount()


   
    return (
        <header className={styles.header}>
            <div className={styles.brand} onClick={() => navigate('/')} >
            <img src={Logo} alt="" />
            <p>STARLENS</p>
            </div>

            <div>
                {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" className={styles.input} /> */}

                {isLogged ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <UserNav/>
                    </Box>
                ) : (
                    <>
                    <MetaMaskConnectionButton />
                    </>
                )}
            </div>

            {/* <Drawer
                anchor={'right'}
                open={drawer}
                onClose={toggleDrawer('right', false)}
            >
                {list('right')}
            </Drawer> */}


        </header>
    )
}

export default NavBar