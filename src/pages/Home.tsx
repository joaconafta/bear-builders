import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import useEthereum from '../hooks/useEthereum'
import useAccount from '../hooks/useAccount'
import Web3 from 'web3'
import { ethers } from 'ethers'
import { authenticate, generateChallenge } from '../services/ApoloService'

const Home: React.FC = () => {
  const ethereum = window.ethereum

  const { account } = useAccount()

  const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)

  const web3 = new Web3(ethereum)

  const [jsonToken, setJsonToken] = useState('Sin JSONToken')
  const [nonce, setNonce] = useState('')

  const signNonce = async () => {
    const signature = await ethersProvider.getSigner().signMessage(nonce)
    const accessTokens = await authenticate(account!, signature)
    setJsonToken(accessTokens.data.authenticate.accessToken)
  }

  const getChallenge = async () => {
    setNonce((await generateChallenge(account!)).data.challenge.text)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
      <Button onClick={getChallenge}>Get nonce</Button>
      <Button onClick={() => signNonce()}>Firmar</Button>
      <Typography>WALLET: {account}</Typography>
      <Typography>NONCE: {nonce}</Typography>
      <TextField id="outlined-basic" label="Nonce" variant="outlined" onChange={(event) => setNonce(event.target.value)} />
      <Typography>{jsonToken}</Typography>
    </Box>
  )
}

export default Home
