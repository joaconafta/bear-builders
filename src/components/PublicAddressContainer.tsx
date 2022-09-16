import { Tooltip, Typography } from '@mui/material'
import React from 'react'
import useAccount from '../hooks/useAccount'

const PublicAddressContainer: React.FC = () => {
  const { account } = useAccount()

  return (
    <Tooltip title={account ? account : ''}>
      <Typography>
        {account?.slice(0, 5)}...{account?.slice(-5)}
      </Typography>
    </Tooltip>
  )
}

export default PublicAddressContainer
