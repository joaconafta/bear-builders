import { useContext } from 'react'
import { AccountContext, AccountContextProps } from '../contexts/AccountContext'

const useAccount: () => AccountContextProps = () => {
  return useContext(AccountContext)
}

export default useAccount
