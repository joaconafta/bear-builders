import useAccount from '../hooks/useAccount'
import { LoadingButton } from '@mui/lab'
import React from 'react'

const LogoutButton: React.FC = () => {
  const { logout } = useAccount()

  const handleLogout = () => {
    logout()
  }

  return (
    <LoadingButton variant="outlined" size="small" onClick={handleLogout}>
      Salir
    </LoadingButton>
  )
}

export default LogoutButton
