import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSnackbar } from 'notistack'
import useAccount from '../hooks/useAccount'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'

const MetaMaskConnectionButton: React.FC = () => {
  const { login } = useAccount()
  const { promiseInProgress } = usePromiseTracker({ area: 'login' })
  const { enqueueSnackbar } = useSnackbar()
  const ethereum = window.ethereum

  const handleAddress = async () => {
    try {
      const accounts: string[] = await trackPromise(ethereum.request({ method: 'eth_requestAccounts' }), 'login')
      const address = accounts[0]

      await login(address)
    } catch (e) {
      console.log(e)
      /* enqueueSnackbar('Please connect to MetaMask', { variant: 'error' }) */
      window.location.reload()
    }
  }

  const connect = async () => {
    if (!ethereum) enqueueSnackbar('Es necesario instalar el plugin de metamask', { variant: 'error' })
    else {
      try {
        await handleAddress()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <LoadingButton variant="contained" loading={promiseInProgress} onClick={connect}>
      Conectar billetera
    </LoadingButton>
  )
}

export default MetaMaskConnectionButton
