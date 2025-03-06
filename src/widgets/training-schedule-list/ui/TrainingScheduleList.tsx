import { styled } from 'styled-components'

import { DeleteTrainingScheduleButton } from '@/features/delete-training-schedule/ui/DeleteTrainingScheduleButton'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { formatDate } from '@/shared/lib/formatDate'
import { EmptyMessage } from '@/shared/ui/Error'
import { Loading } from '@/shared/ui/Loading'

import { useTrainingSchedule } from '../hook/useTrainingSchedule'

export const TrainingScheduleList = () => {
  const { sortedScheduleList, isPending, isError, fetchedScheduleList } = useTrainingSchedule()

  if (isPending) return <Loading />
  if (isError) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />
  if (!fetchedScheduleList || !fetchedScheduleList.dates.length)
    return <EmptyMessage label={ERROR_MESSAGES.NO_DATE_TAG} />

  return (
    <Container>
      {sortedScheduleList.map((schedule) => (
        <DateListContainer key={schedule.trainingDate}>
          <span>{formatDate(schedule.trainingDate, 'dotFullDate')}</span>
          <DeleteTrainingScheduleButton schedule={schedule} />
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

  span {
    ${({ theme }) => theme.font(700, theme.colors.black[600])};
    flex-grow: 1;
  }
`
