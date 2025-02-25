import { styled } from 'styled-components'

import { useModalActions } from '@/shared/model/modal.type'

import { useDeleteId } from '../api/useMypage.mutation'

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
