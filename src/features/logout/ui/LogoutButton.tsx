import { styled } from 'styled-components'

import { useLogout } from '@/entities/mypage/api/useMypage.mutation'
import { useModalActions } from '@/shared/model/modal.store'

export const LogoutButton = () => {
  const { mutate: logout } = useLogout()
  const { openOneButtonModal } = useModalActions()

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (response) => openOneButtonModal(response, true),
      onError: (error) => openOneButtonModal(error.message, false),
    })
  }

  return <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
`
