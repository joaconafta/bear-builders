import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import useAccount from '../hooks/useAccount'
import { ethers } from 'ethers'
import { authenticate, generateChallenge } from '../services/ApoloService'

const Home: React.FC = () => {
  const ethereum = window.ethereum

  const { account } = useAccount()

  const ethersProvider = new ethers.providers.Web3Provider(ethereum)

  const [jsonToken, setJsonToken] = useState('Sin JSONToken')

  const login = async () => {
    const nonce = (await generateChallenge(account!)).data.challenge.text
    const signature = await ethersProvider.getSigner().signMessage(nonce)
    const accessTokens = await authenticate(account!, signature)
    setJsonToken(accessTokens.data.authenticate.accessToken)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
      <Button onClick={() => login()}>Login</Button>
      <Typography>{jsonToken}</Typography>
    </Box>
  )
}

export default Home
