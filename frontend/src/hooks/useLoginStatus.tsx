import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAtom } from '@stores/atoms/userStore'
import { useAtom } from 'jotai'

const useLoginStatus = () => {
  const navigate = useNavigate()
  const [user, setUser] = useAtom(userAtom)
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    const currentUserData = currentUser ? JSON.parse(currentUser) : null
    if (currentUserData && user.name === '') {
      setUser(currentUserData)
    } else if (!currentUserData && user.name !== '') {
      localStorage.setItem('currentUser', JSON.stringify(user))
    } else if (!currentUserData && user.name === '') {
      alert('로그인 후 이용해주세요')
      navigate('/signin')
    }
  }, [navigate, user, setUser])
}
export default useLoginStatus
