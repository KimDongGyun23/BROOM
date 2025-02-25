import { styled } from 'styled-components'

import { useModalActions } from '@/shared/model/modal'

import { useLogout } from '../api/useMypage.mutation'

export const LogoutButton = () => {
  const { mutate: logout } = useLogout()
  const { openModal } = useModalActions()

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (response) => openModal(response, true),
      onError: (error) => openModal(error.message, false),
    })
  }

  return <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
`
