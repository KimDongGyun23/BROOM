import styled from 'styled-components'

import type { TrainingSchedule } from '@/entities/admin/model/admin.type'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

import { useDeleteTrainingSchedule } from '../hook/useDeleteTrainingSchedule'

type DeleteTrainingScheduleButtonProps = {
  schedule: TrainingSchedule
}

export const DeleteTrainingScheduleButton = ({ schedule }: DeleteTrainingScheduleButtonProps) => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  const { handleDeleteTrainingSchedule } = useDeleteTrainingSchedule(openModal)

  return (
    <>
      <StyledButton type="button" onClick={() => handleDeleteTrainingSchedule(schedule.id)}>
        삭제
      </StyledButton>

      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.error)}
        closeModal={closeModal}
        button={{ onClickButton: closeModal }}
      />
    </>
  )
}

const StyledButton = styled.button`
  ${({ theme }) => theme.font(800, theme.colors.error)};
  color: ${({ theme }) => theme.colors.error};
  flex-shrink: 0;
`
