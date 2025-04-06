import styled from 'styled-components'

import { useRemoveTrainingDate } from '../model/useRemoveTrainingDate'

type RemoveTrainingDateButtonProps = {
  dateId: number
}

export const DeleteTrainingDateButton = ({ dateId }: RemoveTrainingDateButtonProps) => {
  const { handleRemoveTrainingDate } = useRemoveTrainingDate()

  return (
    <StyledButton type="button" onClick={() => handleRemoveTrainingDate(dateId)}>
      삭제
    </StyledButton>
  )
}

const StyledButton = styled.button`
  ${({ theme }) => theme.font(800, theme.colors.error)};
  flex-shrink: 0;
`
