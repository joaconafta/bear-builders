import React, { createContext, useEffect, useState } from 'react'
import useAccount from '../hooks/useAccount'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import Alert from '../components/Alert'
import { nftContractAddress, chainId, abi, networkData, chainIdInHex } from '../constants/SmartContact'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'

export interface EthereumContextProps {
  readonly isInRightChain: boolean
}

export const EthereumContext = createContext<EthereumContextProps>({
  isInRightChain: false
})

interface EthereumProviderProps {
  children: React.ReactNode
}

const EthereumContextProvider: React.FC<EthereumProviderProps> = ({ children }) => {
  const [currentChainId, setCurrentChainId] = useState<number>(chainId)

  const { login } = useAccount()
  const web3 = new Web3()
  const ethereum = window.ethereum
  web3.setProvider(ethereum)

  const [isInRightChain, setIsInRightChain] = useState(true)

  useEffect(() => {
    const feach = async () => {
      try {
        setCurrentChainId(await web3.eth.getChainId())
        listenForWalletChanges()
      } catch (error) {
        console.log(error)
      }
    }
    feach()
  }, [ethereum, web3.eth])

  useEffect(() => {
    setIsInRightChain(chainId === currentChainId)
  }, [currentChainId])

  /* useEffect(() => {
    fetchBalance()
  }, [account]) */

  const listenForWalletChanges = () => {
    listenForAccountChanges()
    listenForChainChanges()
  }

  const listenForAccountChanges = () => {
    window.ethereum.on('accountsChanged', function (accounts: string[]) {
      login(accounts[0])
    })
  }

  const listenForChainChanges = () => {
    window.ethereum.on('chainChanged', (_chainId: number) => {
      setCurrentChainId(_chainId)
      window.location.reload()
    })
  }

  //Manual changes of chain

  const handleChangeChain = async () => {
    await addPolygonChain()
    await changeChain()
  }

  const addPolygonChain = async () => {
    await ethereum.request({ method: 'wallet_addEthereumChain', params: networkData }).catch()
  }

  const changeChain = async () => {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdInHex }]
    })
  }

  return (
    <EthereumContext.Provider
      value={{
        isInRightChain
      }}
    >
      {children}
      <Alert onClick={handleChangeChain} />
    </EthereumContext.Provider>
  )
}

export default EthereumContextProvider
