import React, { useState,useContext } from 'react'
import { Drawer, Button, Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, List, TextField } from '@mui/material'
import useAccount from '../hooks/useAccount';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './navBar.module.scss'
import Logo from '../assets/starlensLogo.png'
const NavBar = () => {
    const [drawer, setDrawer] = useState({ right: false })
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

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>

                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>

                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <header className={styles.header}>
            <div>
            <img src={Logo} alt="" />
            <p>STARLENS</p>
            </div>

            <div>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" className={styles.input} />

                <Button onClick={toggleDrawer('right', true)} className={styles.button}><MenuIcon /></Button>
            </div>

            <Drawer
                anchor={'right'}
                open={drawer}
                onClose={toggleDrawer('right', false)}
            >
                {list('right')}
            </Drawer>


        </header>
    )
}

export default NavBar