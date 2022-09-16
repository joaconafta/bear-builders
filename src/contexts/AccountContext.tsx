import { ethers } from 'ethers'
import React, { createContext, useEffect, useState } from 'react'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import useLocalStorage from '../hooks/useLocalStorage'
import { authenticate, createProfile, generateChallenge, getProfiles } from '../services/ApoloService'
import { ProfileType } from '../types/ProfileType'

export interface AccountContextProps {
  readonly address: string | null
  readonly profile: ProfileType | null
  readonly login: (address: string) => Promise<void>
  readonly logout: () => void
  readonly jsonToken: string | null
  readonly isLogged: boolean
}

export const AccountContext = createContext<AccountContextProps>({
  address: null,
  login: () => Promise.resolve(),
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
    await getToken(address)
  }

  const getProfile = async () => {
    let profiles = (await getProfiles(address!)).data.profiles.items
    if (!profiles.length) {
      console.log('creando...')
      await createProfile('Test')
      profiles = (await getProfiles(address!)).data.profiles.item
      console.log('creado...')
    } else setProfile(profiles[0])
  }

  const getToken = async (address: string) => {
    const challenge = (await generateChallenge(address)).data.challenge.text
    const signature = await trackPromise(ethersProvider.getSigner().signMessage(challenge), 'login')
    const token = await trackPromise(authenticate(address, signature), 'login')
    setJsonToken(token.data.authenticate.accessToken)
    setAddress(address)
  }

  useEffect(() => {
    const feach = async () => {
      try {
        address && (await getProfile())
      } catch (error) {
        console.log(error)
      }
    }
    feach()
  }, [address])

  const isLogged = !!address && !!jsonToken && !!profile

  return <AccountContext.Provider value={{ address, login, jsonToken, isLogged, logout, profile }}>{children}</AccountContext.Provider>
}

export default AccountContextProvider
