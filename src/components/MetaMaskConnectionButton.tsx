import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSnackbar } from 'notistack'
import useAccount from '../hooks/useAccount'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { authenticate, generateChallenge, getProfiles } from '../services/ApoloService'
import { ethers } from 'ethers'

const MetaMaskConnectionButton: React.FC = () => {
  const { setAccount, setJsonToken } = useAccount()
  const { promiseInProgress } = usePromiseTracker({ area: 'login' })
  const { enqueueSnackbar } = useSnackbar()
  const width = window.innerWidth
  const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)

  const connect = async () => {
    const ethereum = window.ethereum

    if (!ethereum && width < 900)
      enqueueSnackbar('Instalá la app de Metamask y abrí esta web en el navegador interno de la app', { variant: 'error' })
    else if (!ethereum && width >= 900) enqueueSnackbar('Es necesario instalar el plugin de metamask', { variant: 'error' })
    else {
      try {
        const accounts: string[] = await trackPromise(ethereum.request({ method: 'eth_requestAccounts' }), 'login')
        const account = accounts[0]
        setAccount(account)

        const nonce = (await generateChallenge(account!)).data.challenge.text
        const signature = await ethersProvider.getSigner().signMessage(nonce)
        const accessTokens = await authenticate(account!, signature)
        setJsonToken(accessTokens.data.authenticate.accessToken)

        const profiles = (await getProfiles(account!)).data.profiles.items
        let profile = {}
        if (!profiles.length) console.log('No tenes perfil')
        else profile = profiles[0]
        console.log(profile)


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
