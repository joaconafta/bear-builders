import { Box } from '@mui/material'
import React from 'react'
import useAccount from '../../hooks/useAccount'
import LogoutButton from '../LogoutButton'
import MetaMaskConnectionButton from '../MetaMaskConnectionButton'
import PublicAddressContainer from '../PublicAddressContainer'

const NavBar: React.FC = () => {
  const { account } = useAccount()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 2
      }}
    >
      {account ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PublicAddressContainer />
          <LogoutButton />
        </Box>
      ) : (
        <>
          <MetaMaskConnectionButton />
        </>
      )}
    </Box>
  )
}

export default NavBar
