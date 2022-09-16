import React, { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export interface AccountContextProps {
  readonly account: string | null
  readonly setAccount: (user: string | null) => void
  readonly logout: () => void
}

export const AccountContext = createContext<AccountContextProps>({
  account: null,
  setAccount: () => null,
  logout: () => null
})

interface AccountProviderProps {
  children: React.ReactNode
}

const AccountContextProvider: React.FC<AccountProviderProps> = ({ children }) => {
  const { storedValue, setValue } = useLocalStorage<string | null>('account', null)

  const logout = () => {
    setValue(null)
  }

  return <AccountContext.Provider value={{ account: storedValue, setAccount: setValue, logout }}>{children}</AccountContext.Provider>
}

export default AccountContextProvider
