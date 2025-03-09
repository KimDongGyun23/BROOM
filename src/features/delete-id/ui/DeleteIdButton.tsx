import { styled } from 'styled-components'

import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useDeleteId } from '../hook/useDeleteId'

import { DeleteIdErrorModal } from './DeleteIdErrorModal'
import { DeleteIdSuccessModal } from './DeleteIdSuccessModal'

export const DeleteIdButton = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  const { handleDeleteId } = useDeleteId(openModal)

  return (
    <>
      <ActionButton onClick={handleDeleteId}>회원탈퇴</ActionButton>

      <DeleteIdSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />

      <DeleteIdErrorModal
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </>
  )
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.error)};
`
