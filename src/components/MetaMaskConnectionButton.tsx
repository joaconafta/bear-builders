import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSnackbar } from 'notistack'
import useAccount from '../hooks/useAccount'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'

const MetaMaskConnectionButton: React.FC = () => {
  const { setAccount } = useAccount()
  const { promiseInProgress } = usePromiseTracker({ area: 'login' })
  const { enqueueSnackbar } = useSnackbar()
  const width = window.innerWidth

  const connect = async () => {
    const ethereum = window.ethereum

    if (!ethereum && width < 900)
      enqueueSnackbar('Instalá la app de Metamask y abrí esta web en el navegador interno de la app', { variant: 'error' })
    else if (!ethereum && width >= 900) enqueueSnackbar('Es necesario instalar el plugin de metamask', { variant: 'error' })
    else {
      try {
        const accounts: string[] = await trackPromise(ethereum.request({ method: 'eth_requestAccounts' }), 'login')
        setAccount(accounts[0])
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
