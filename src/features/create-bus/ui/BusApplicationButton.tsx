import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { Button } from '@/shared/ui/Button'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

import { useCreateBusApplication } from '../hook/useCreateBusApplication'

export const BusApplicationButton = () => {
  const navigate = useNavigate()
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { onSubmit } = useCreateBusApplication(openModal)

  const handleClickModal = () => {
    closeModal()
    navigate('/bus-application', { replace: true })
  }

  return (
    <>
      <StyledButton size="lg" onClick={onSubmit}>
        신청하기
      </StyledButton>
      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={handleClickModal}
        button={{ onClickButton: handleClickModal }}
      />
    </>
  )
}

const StyledButton = styled(Button)`
  ${({ theme }) => theme.margin('xl', 'container')};
`
