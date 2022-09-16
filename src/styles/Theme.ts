import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FFFF' },
    secondary: { main: 'rgb(26 26 34)' }
  },
  typography: {
    fontFamily: ['Bebas Neue', 'Roboto', 'sans-serif'].join(','),
    body1: {
      color: 'white'
    },
    subtitle1: {
      fontFamily: 'calibri',
      color: 'white'
    }
  }
})
