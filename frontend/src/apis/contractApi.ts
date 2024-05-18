import { useMutation } from '@tanstack/react-query'
import { API_BASE_URL } from '@constants/api'
// export const API_BASE_URL = 'https://k10c203.p.ssafy.io'
export const API_BASE_PATH = '/api/v1'
export const API_BASE = `${API_BASE_URL}${API_BASE_PATH}`
import { publicRequest } from '@/hooks/requestMethods'
export const API_CONTRACT_ADDRESS_REGISTRATION = `${API_BASE}/chatrooms/contract`

interface ContractAddressPayload {
  chatRoomNo: number
  contractAddress: string
}

export const useRegisterContractAddress = () => {
  return useMutation({
    mutationFn: (contractAddressPayload: ContractAddressPayload) =>
      publicRequest.post(
        API_CONTRACT_ADDRESS_REGISTRATION,
        contractAddressPayload,
      ),
    onSuccess: () => {
      console.log('계약서가 성공적으로 등록되었습니다.')
    },
    onError: error => {
      console.error('계약서 등록에 실패했습니다:', error)
    },
  })
}

export const useSaveContractAddress = () => {
  return useMutation({
    mutationFn: (contractAddressPayload: ContractAddressPayload) =>
      publicRequest.patch(
        API_CONTRACT_ADDRESS_REGISTRATION,
        contractAddressPayload,
      ),
    onSuccess: () => {
      console.log('계약서가 성공적으로 등록되었습니다.')
    },
    onError: error => {
      console.error('계약서 등록에 실패했습니다:', error)
    },
  })
}

export const fetchTempContractAddress = async (chatRoomNo: number) => {
  const response = await publicRequest.get(
    `${API_BASE_URL}/api/v1/chatrooms/contract?chatRoomNo=${chatRoomNo}`,
  )
  return response.data
}
