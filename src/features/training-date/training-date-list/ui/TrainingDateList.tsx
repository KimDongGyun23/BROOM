import { styled } from 'styled-components'

import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { formatDate } from '@/shared/lib/formatDate'
import { EmptyMessage } from '@/shared/ui/Error'

import { DeleteTrainingDateButton } from '../../delete-training-date/ui/DeleteTrainingDateButton'
import { useTrainingDates } from '../model/useTrainingDates'

export const TrainingDateList = () => {
  const { sortedDates, isError } = useTrainingDates()

  if (isError) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />
  if (!sortedDates.length) return <EmptyMessage label={ERROR_MESSAGES.NO_DATA} />

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
