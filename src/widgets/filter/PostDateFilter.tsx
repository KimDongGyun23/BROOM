import styled from 'styled-components'

import { useFetchTrainingDates } from '@/entities/admin/api/useAdmin.query'
import { useDateTag, useDateTagActions } from '@/features/filter/model/dateTag.store'
import { formatDate } from '@/shared/lib/formatDate'

type TagProps = {
  date: string
}

const Tag = ({ date }: TagProps) => {
  const selectedDate = useDateTag()

  const { setDateTag } = useDateTagActions()

  const isSelected = selectedDate === date

  const handleClickTag = () => setDateTag(isSelected ? null : date)

  return (
    <TagButton onClick={handleClickTag} $isSelected={isSelected}>
      {formatDate(date, 'dotDate', 'default')}
    </TagButton>
  )
}

export const PostDateFilter = () => {
  const { data, isPending, isError } = useFetchTrainingDates()

  if (isPending || isError || !data || !data.dates?.length) return null

  return (
    <Container>
      {data.dates.map(({ id, trainingDate }) => (
        <Tag key={id} date={formatDate(trainingDate, 'default', 'dotFullDate')} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
`

const TagButton = styled.button<{ $isSelected: boolean }>`
  ${({ theme, $isSelected }) => `
    ${theme.padding('tag')}
    ${theme.borderRadius('md')}
    ${theme.font(900, $isSelected ? 'white' : theme.colors.black[500])}
    background-color: ${$isSelected ? theme.colors.black[500] : theme.colors.black[200]};
  `}
`
