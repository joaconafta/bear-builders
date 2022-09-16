import React, { createContext, useEffect, useState } from 'react'
import useAccount from '../hooks/useAccount'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import Alert from '../components/Alert'
import { nftContractAddress, chainId, abi, networkData, chainIdInHex } from '../constants/SmartContact'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'

export interface EthereumContextProps {
  readonly contract: Contract
  readonly isInRightChain: boolean
  readonly fetchingBalance: boolean
  readonly balance: number | undefined
  readonly fetchBalance: () => Promise<void>
}

export const EthereumContext = createContext<EthereumContextProps>({
  isInRightChain: false,
  contract: new new Web3().eth.Contract(abi, nftContractAddress),
  fetchingBalance: true,
  balance: 0,
  fetchBalance: () =>
    new Promise(() => {
      null
    })
})

interface EthereumProviderProps {
  children: React.ReactNode
}

const EthereumContextProvider: React.FC<EthereumProviderProps> = ({ children }) => {
  const [currentChainId, setCurrentChainId] = useState<number>(chainId)
  const [balance, setBalance] = useState<number | undefined>(undefined)
  const { promiseInProgress: fetchingBalance } = usePromiseTracker({ area: 'fetchingBalance' })
  const { address, login } = useAccount()
  const web3 = new Web3()
  const ethereum = window.ethereum
  web3.setProvider(ethereum)
  const contract = new web3.eth.Contract(abi, nftContractAddress, {
    from: address!
  })

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

  const fetchBalance = async () => {
    try {
      const balance = address ? +((await trackPromise(contract.methods.balanceOf(address).call(), 'fetchingBalance')) as string) : 0
      setBalance(balance)
    } catch (error) {
      console.log(error)
    }
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
        contract,
        isInRightChain,
        balance,
        fetchBalance,
        fetchingBalance
      }}
    >
      {children}
      <Alert onClick={handleChangeChain} />
    </EthereumContext.Provider>
  )
}

export default EthereumContextProvider
