import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import useEthereum from '../hooks/useEthereum'
import useAccount from '../hooks/useAccount'

const Home: React.FC = () => {
  const ethereum = window.ethereum

  const { account } = useAccount()

  const [signature, setSignature] = useState('Sin firma')
  const [nonce, setNonce] = useState('')

  const sing = () => {
    ethereum
      .request({
        method: 'personal_sign',
        params: ['0x' + nonce, account]
      })
      .then(setSignature)
  }

  return (
    <>
      <Button onClick={() => sing()}>Firmar</Button>
      <Typography>WALLET: {account}</Typography>
      <TextField id="outlined-basic" label="Nonce" variant="outlined" onChange={(event) => setNonce(event.target.value)} />
      <Typography>{signature}</Typography>
    </>
  )
}

export default Home
