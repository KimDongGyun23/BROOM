import { useEffect } from 'react'
import { styled } from 'styled-components'

import { useTrainingScheduleActions } from '@/entities/admin/model/trainingSchedule.store'
import { useFetchDateFilter } from '@/entities/board/api/useBoard.query'
import { DeleteTrainingScheduleButton } from '@/features/delete-training-schedule/ui/DeleteTrainingScheduleButton'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { formatDate } from '@/shared/lib/formatDate'
import { EmptyMessage } from '@/shared/ui/Error'
import { Loading } from '@/shared/ui/Loading'

export const TrainingScheduleList = () => {
  const { data: scheduleList, isLoading, isError } = useFetchDateFilter()

  const { sortedDates, initializeSchedules } = useTrainingScheduleActions()

  useEffect(() => {
    if (scheduleList && scheduleList.dates.length) {
      initializeSchedules(scheduleList.dates)
    }
  }, [scheduleList, initializeSchedules])

  if (isLoading) return <Loading />
  if (isError) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />
  if (!scheduleList || !scheduleList.dates.length)
    return <EmptyMessage label={ERROR_MESSAGES.NO_DATE_TAG} />

  const sortedSchedules = sortedDates()

  return (
    <Container>
      {sortedSchedules.map((schedule) => (
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
