import { ethers } from 'ethers'
import { BLOCK_CHAIN_ENDPOINT, USER_DID_REGISTRY_CONTRACT_ADDRESS } from '@constants/abi/abi'
import { USER_DID_REGISTRY_ABI } from '@constants/abi/userDIDRegistryAbi'

export const baseUserDIDRegistryContract = (wallet?: ethers.Wallet) => {
  const provider = new ethers.providers.JsonRpcProvider(BLOCK_CHAIN_ENDPOINT)
  const contract = new ethers.Contract(
    USER_DID_REGISTRY_CONTRACT_ADDRESS,
    USER_DID_REGISTRY_ABI,
    provider,
  )
  return wallet ? contract.connect(wallet) : contract
}
