import { styled } from 'styled-components'

import { useDeleteId } from '../hook/useDeleteId'

export const DeleteIdButton = () => {
  const { handleDeleteId } = useDeleteId()

  return <ActionButton onClick={handleDeleteId}>회원탈퇴</ActionButton>
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.error)};
`
