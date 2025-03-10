import styled from 'styled-components'

import type { TrainingSchedule } from '@/entities/admin/model/admin.type'

import { useDeleteTrainingSchedule } from '../hook/useDeleteTrainingSchedule'

type DeleteTrainingScheduleButtonProps = {
  schedule: TrainingSchedule
}

export const DeleteTrainingScheduleButton = ({ schedule }: DeleteTrainingScheduleButtonProps) => {
  const { handleDeleteTrainingSchedule } = useDeleteTrainingSchedule()

  return (
    <StyledButton type="button" onClick={() => handleDeleteTrainingSchedule(schedule.id)}>
      삭제
    </StyledButton>
  )
}

const StyledButton = styled.button`
  ${({ theme }) => theme.font(800, theme.colors.error)};
  color: ${({ theme }) => theme.colors.error};
  flex-shrink: 0;
`
