import { CssBaseline } from '@mui/material'
import React from 'react'
import AccountContextProvider from './contexts/AccountContext'
import EthereumContextProvider from './contexts/EthereumContext'
import SnackBarProvider from './contexts/SnackBarContext'
import { ThemeProvider } from '@mui/material/styles'
import Routes from './routes'
import { darkTheme } from './styles/Theme'
import Layout from './components/Layout'
const App: React.FC = () => {
  return (
    <SnackBarProvider>
      <AccountContextProvider>
        <EthereumContextProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Layout>
            <Routes/>
            </Layout>
          </ThemeProvider>
        </EthereumContextProvider>
      </AccountContextProvider>
    </SnackBarProvider>
  )
}

export default App
