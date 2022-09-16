import { Snackbar } from '@mui/material'
import React from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import useEthereum from '../hooks/useEthereum'

interface MyAlertProps {
  onClick: () => Promise<void>
}

const Alert: React.FC<MyAlertProps> = ({ onClick }) => {
  const { isInRightChain } = useEthereum()
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })
  return (
    <Snackbar
      onClick={() => onClick()}
      open={!isInRightChain}
      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity="info" sx={{ width: '100%', fontWeight: 600 }}>
        Please click here to switch to a valid network
      </Alert>
    </Snackbar>
  )
}

export default Alert
