import { useFormContext } from 'react-hook-form'
import { styled } from 'styled-components'

import type { BusApplication } from '@/entities/bus/model/bus.type'
import { useCreateBusApplication } from '@/features/create-bus/hook/useCreateBusApplication'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { Button } from '@/shared/ui/Button'

import { ApplyBusSuccessModal } from './modal/ApplyBusSuccessModal'

export const BusApplicationButton = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { handleSubmit } = useFormContext<BusApplication>()

  const { handleCreateBusApplication } = useCreateBusApplication(openModal)

  return (
    <>
      <StyledButton size="lg" onClick={handleSubmit(handleCreateBusApplication)}>
        신청하기
      </StyledButton>

      <ApplyBusSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </>
  )
}

const StyledButton = styled(Button)`
  ${({ theme }) => theme.margin('xl', 'container')};
`
