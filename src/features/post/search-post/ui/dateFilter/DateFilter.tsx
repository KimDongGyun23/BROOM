import styled from 'styled-components'

import { useFetchTrainingDates } from '@/entities/admin/api/useAdmin.query'
import { formatDate } from '@/shared/lib/formatDate'

type Props = {
  isDateSelected: (date: string) => boolean
  onDateToggle: (date: string) => void
}

export const DateFilter = ({ isDateSelected, onDateToggle }: Props) => {
  const { data } = useFetchTrainingDates()

  if (!data.dates?.length) return null

  return (
    <Container>
      {data.dates.map(({ id, trainingDate }) => {
        const formattedDate = formatDate(trainingDate, 'default', 'dotFullDate')
        const isActive = isDateSelected(formattedDate)

        return (
          <DateTagButton
            key={id}
            onClick={() => onDateToggle(formattedDate)}
            $isSelected={isActive}
          >
            {formatDate(trainingDate, 'dotDate', 'dotFullDate')}
          </DateTagButton>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
`

const DateTagButton = styled.button<{ $isSelected: boolean }>`
  ${({ theme, $isSelected }) => `
    ${theme.padding('tag')}
    ${theme.borderRadius('md')}
    ${theme.font(900, $isSelected ? 'white' : theme.colors.black[500])}
    background-color: ${$isSelected ? theme.colors.black[500] : theme.colors.black[200]};
  `}
`
