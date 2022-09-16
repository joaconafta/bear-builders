import { ethers } from 'ethers'
import React, { createContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { authenticate, generateChallenge, getProfiles } from '../services/ApoloService'
import { ProfileType } from '../types/ProfileType'

export interface AccountContextProps {
  readonly address: string | null
  readonly profile: ProfileType | null
  readonly login: (address: string) => void
  readonly logout: () => void
  readonly jsonToken: string | null
  readonly isLogged: boolean
}

export const AccountContext = createContext<AccountContextProps>({
  address: null,
  login: () => null,
  logout: () => null,
  jsonToken: null,
  isLogged: false,
  profile: null
})

interface AccountProviderProps {
  children: React.ReactNode
}

const AccountContextProvider: React.FC<AccountProviderProps> = ({ children }) => {
  const { storedValue: address, setValue: setAddress } = useLocalStorage<string | null>('account', null)
  const { storedValue: jsonToken, setValue: setJsonToken } = useLocalStorage<string | null>('jsonToken', null)
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)

  const logout = () => {
    setAddress(null)
    setJsonToken(null)
    setProfile(null)
  }

  const login = async (address: string) => {
    const jsonToken = await getToken(address)
    setAddress(address)
    setJsonToken(jsonToken)
  }

  const getProfile = async (address: string) => {
    const profiles = (await getProfiles(address)).data.profiles.items
    console.log(profiles)
    if (!profiles.length) console.log('No tenes perfil')
    else {
      console.log(profile, address)
      setProfile(profiles[0])
    }
  }

  useEffect(() => {
    const feach = async () => {
      try {
        if (address) {
          await getProfile(address)
        }
      } catch (error) {
        console.log(error)
      }
    }
    feach()
  }, [address])

  const getToken = async (address: string) => {
    if (!jsonToken) {
      const nonce = (await generateChallenge(address)).data.challenge.text
      console.log(nonce)
      const signature = await ethersProvider.getSigner().signMessage(nonce)
      const accessTokens = await authenticate(address, signature)
      return accessTokens.data.authenticate.accessToken
    }
  }

  const isLogged = !!address && !!jsonToken && !!profile

  return <AccountContext.Provider value={{ address, login, jsonToken, isLogged, logout, profile }}>{children}</AccountContext.Provider>
}

export default AccountContextProvider
