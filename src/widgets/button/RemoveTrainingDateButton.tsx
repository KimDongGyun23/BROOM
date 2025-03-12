import styled from 'styled-components'

import { useRemoveTrainingDate } from '@/features/remove-training-date/hook/useRemoveTrainingDate'

type RemoveTrainingDateButtonProps = {
  dateId: number
}

export const RemoveTrainingDateButton = ({ dateId }: RemoveTrainingDateButtonProps) => {
  const { handleRemoveTrainingDate } = useRemoveTrainingDate()

  return (
    <StyledButton type="button" onClick={() => handleRemoveTrainingDate(dateId)}>
      삭제
    </StyledButton>
  )
}

const StyledButton = styled.button`
  ${({ theme }) => theme.font(800, theme.colors.error)};
  color: ${({ theme }) => theme.colors.error};
  flex-shrink: 0;
`
