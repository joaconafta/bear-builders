import useAccount from '../hooks/useAccount'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import useEthereum from '../hooks/useEthereum'
import { useSnackbar } from 'notistack'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { FormType } from '../types/PurchaseFormType'
import { isInvalidEmail } from '../utils/EmailValidator'
import emailService from '../services/EmailService'

interface MintButtonProps {
  form: FormType
  setClickPurchase: (clickPurchase: boolean) => void
  handleClose: () => void
}

const MintButton: React.FC<MintButtonProps> = ({ form, setClickPurchase, handleClose }) => {
  const { address: account } = useAccount()
  const { isInRightChain } = useEthereum()
  const { enqueueSnackbar } = useSnackbar()
  const { contract, fetchBalance, balance, fetchingBalance } = useEthereum()
  const { promiseInProgress: mintingInProgress } = usePromiseTracker({ area: 'minting' })

  const formIsValid: boolean = !!form.email && !!form.interest && !isInvalidEmail(form.email)

  const handleMint = async () => {
    try {
      setClickPurchase(true)
      console.log(form)
      if (account && formIsValid) {
        try {
          await emailService.sendForm(form)
        } catch (e) {
          console.log(e)
        }
        enqueueSnackbar('Minteando, no cierres esta ventana...', { variant: 'info' })
        await trackPromise(
          contract.methods
            .mintNFT()
            .send({ from: account, gasPrice: 60000000000 })
            // Mando la transaccion a la blockchain y recibo un hash de la misma
            .on('transactionHash', (hash: string) => {
              console.log('hash', hash)
              enqueueSnackbar('Transaccion ingresada, a la espera de una confirmacion', { variant: 'info' })
            })
            // Se confirma la transaccion
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .on('receipt', (receipt: any) => {
              console.log('receipt', receipt)
              enqueueSnackbar('Tu NFT se ha minteado con exito', { variant: 'success' })
            })
            // La transaccion falla
            .on('error', (error: Error) => {
              console.log('error', error)
              if (!error.message.includes('User denied transaction signature')) {
                enqueueSnackbar(error.message, { variant: 'error' })
              }
            }),
          'minting'
        )
        await fetchBalance()
        handleClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const dontHaveNft = balance === 0

  const canMint = isInRightChain && !!account && dontHaveNft

  const tooltipTitle = account ? (isInRightChain ? (dontHaveNft ? '' : 'Ya tienes un NFT') : 'Red incorreceta') : 'Conecta tu billetera'

  return (
    <Tooltip title={tooltipTitle}>
      <Box>
        <LoadingButton disabled={!canMint} loading={mintingInProgress || fetchingBalance} variant="contained" onClick={handleMint}>
          Mint
        </LoadingButton>
      </Box>
    </Tooltip>
  )
}

export default MintButton
