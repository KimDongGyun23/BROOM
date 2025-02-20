import { styled } from 'styled-components'

import { useDeleteId } from '@/query/useMypageQuery'
import { useModalActions } from '@/stores/modal'

export const DeleteIdButton = () => {
  const { mutate: deleteId } = useDeleteId()
  const { openModal } = useModalActions()

  const handleDeleteId = () => {
    deleteId(undefined, {
      onSuccess: (response) => openModal(response, true),
      onError: (error) => openModal(error.message, false),
    })
  }

  return <ActionButton onClick={handleDeleteId}>회원탈퇴</ActionButton>
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.error)};
`
