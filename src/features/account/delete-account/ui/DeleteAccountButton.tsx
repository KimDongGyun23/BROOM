import { styled } from 'styled-components'

import { useDeleteAccount } from '../model/useDeleteAccount'

export const DeleteAccountButton = () => {
  const { handleDeleteAccount } = useDeleteAccount()

  return <ActionButton onClick={handleDeleteAccount}>회원탈퇴</ActionButton>
}

const ActionButton = styled.button`
  ${({ theme }) => `
    ${theme.padding(0, 'lg')};
    ${theme.font(800, theme.colors.error)};
  `}
`
