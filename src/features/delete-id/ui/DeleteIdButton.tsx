import { styled } from 'styled-components'

import { useDeleteId } from '@/entities/mypage/api/useMypage.mutation'
import { useModalActions } from '@/shared/model/modal.store'

export const DeleteIdButton = () => {
  const { mutate: deleteId } = useDeleteId()
  const { openOneButtonModal } = useModalActions()

  const handleDeleteId = () => {
    deleteId(undefined, {
      onSuccess: (response) => openOneButtonModal(response, true),
      onError: (error) => openOneButtonModal(error.message, false),
    })
  }

  return <ActionButton onClick={handleDeleteId}>회원탈퇴</ActionButton>
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.error)};
`
