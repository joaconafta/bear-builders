import { LENS_HUB_ABI } from '../contracts/lens-hub-abi';
import { LENS_HUB_CONTRACT_ADDRESS } from '../contracts/lens-hub-contract-address';
import { getSigner } from './EtherService';
import { ethers } from 'ethers';

// lens contract info can all be found on the deployed
// contract address on polygon.
// not defining here as it will bloat the code example
export const lensHub = new ethers.Contract(
  LENS_HUB_CONTRACT_ADDRESS,
  LENS_HUB_ABI,
  getSigner()
)