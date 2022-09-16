import React, { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export interface AccountContextProps {
  readonly account: string | null
  readonly setAccount: (user: string | null) => void
  readonly logout: () => void
  readonly jsonToken: string | null
  readonly setJsonToken: (token: string | null) => void
  readonly isLogged: boolean
}

export const AccountContext = createContext<AccountContextProps>({
  account: null,
  setAccount: () => null,
  logout: () => null,
  jsonToken: null,
  setJsonToken: () => null,
  isLogged: false
})

interface AccountProviderProps {
  children: React.ReactNode
}

const AccountContextProvider: React.FC<AccountProviderProps> = ({ children }) => {
  const { storedValue, setValue } = useLocalStorage<string | null>('account', null)
  const { storedValue: jsonToken, setValue: setJsonToken } = useLocalStorage<string | null>('jsonToken', null)

  const logout = () => {
    setValue(null)
    setJsonToken(null)
  }

  const isLogged = !!storedValue && !!jsonToken

  return (
    <AccountContext.Provider value={{ account: storedValue, setAccount: setValue, jsonToken, setJsonToken, isLogged, logout }}>
      {children}
    </AccountContext.Provider>
  )
}

export default AccountContextProvider
