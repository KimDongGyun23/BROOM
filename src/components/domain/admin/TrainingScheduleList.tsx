import { styled } from 'styled-components'

import { useTrainingScheduleActions } from '@/shared/model/trainingSchedule'
import { formatDate } from '@/utils/formatDate'

export const TrainingScheduleList = () => {
  const { removeTrainingDate, sortedDates } = useTrainingScheduleActions()

  return (
    <Container>
      {sortedDates().map((date) => (
        <DateListContainer key={date}>
          <span>{formatDate(date, 'dotDate')}</span>
          <button
            type="button"
            className="date-remove-button"
            onClick={() => removeTrainingDate(date)}
          >
            삭제
          </button>
        </DateListContainer>
      ))}
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container')};
  overflow-y: scroll;
`

const DateListContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between', 'md')};

  .date-remove-button {
    ${({ theme }) => theme.font(800, theme.colors.error)};
    color: ${({ theme }) => theme.colors.error};
    flex-shrink: 0;
  }

  span {
    ${({ theme }) => theme.font(700, theme.colors.black[600])};
    flex-grow: 1;
  }
`
