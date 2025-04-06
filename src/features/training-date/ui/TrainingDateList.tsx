import { styled } from 'styled-components'

import { useTrainingDates } from '@/entities/admin/model/useTrainingDates'
import { DeleteTrainingDateButton } from '@/features/delete-training-date/ui/DeleteTrainingDateButton'
import { useTrainingScheduleList } from '@/features/training-date/model/trainingSchedule.store'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { formatDate } from '@/shared/lib/formatDate'
import { EmptyMessage } from '@/shared/ui/Error'

export const TrainingDateList = () => {
  const trainingDates = useTrainingScheduleList()

  const { sortedDates, isError } = useTrainingDates()

  if (isError) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />
  if (!trainingDates.length) return <EmptyMessage label={ERROR_MESSAGES.NO_DATA} />

  return (
    <Container>
      {sortedDates.map((date) => (
        <DateListContainer key={date.trainingDate}>
          <span>{formatDate(date.trainingDate, 'dotFullDate')}</span>
          <DeleteTrainingDateButton dateId={date.id} />
        </DateListContainer>
      ))}
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'xl')}
    ${theme.margin('container')}
  `}
  overflow-y: scroll;
`

const DateListContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between', 'md')};

  span {
    ${({ theme }) => theme.font(700, theme.colors.black[600])};
    flex-grow: 1;
  }
`
