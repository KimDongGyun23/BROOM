import { styled } from 'styled-components'

import { useDeleteId } from '@/features/delete-id/hook/useDeleteId'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const DeleteIdButton = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { handleOpenModal, handleClickModal } = useDeleteId(openModal, closeModal)

  return (
    <>
      <ActionButton onClick={handleOpenModal}>회원탈퇴</ActionButton>

      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={handleClickModal}
        button={{ onClickButton: handleClickModal }}
      />
    </>
  )
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.error)};
`
