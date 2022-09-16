import { useContext } from 'react'
import { EthereumContext, EthereumContextProps } from '../contexts/EthereumContext'

const useEthereum: () => EthereumContextProps = () => {
  return useContext(EthereumContext)
}

export default useEthereum
