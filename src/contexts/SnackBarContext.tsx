import React from 'react'
import { SnackbarProvider } from 'notistack'

interface SnackBarContextProps {
  children: React.ReactNode
}

const SnackBarProvider: React.FC<SnackBarContextProps> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      {children}
    </SnackbarProvider>
  )
}
export default SnackBarProvider
