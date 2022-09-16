import React from 'react'
import { Box, Typography } from '@mui/material'
import useAccount from '../hooks/useAccount'

const Home: React.FC = () => {
  const { jsonToken } = useAccount()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
      <Typography>{jsonToken}</Typography>
    </Box>
  )
}

export default Home
