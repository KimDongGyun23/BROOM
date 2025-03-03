import styled from 'styled-components'

import { useFetchDateFilter } from '@/entities/board/api/useBoard.query'
import { formatDate } from '@/shared/lib/formatDate'

import { useDateTag, useDateTagActions } from '../model/dateTag.store'

type TagProps = {
  date: string
}

const Tag = ({ date }: TagProps) => {
  const selectedDate = useDateTag()
  const { setDateTag } = useDateTagActions()

  const isSelected = selectedDate === date

  const handleClick = () => {
    setDateTag(isSelected ? null : date)
  }

  return (
    <TagButton onClick={handleClick} $isSelected={isSelected}>
      {date}
    </TagButton>
  )
}

export const PostDateFilter = () => {
  const { data, isPending, isError } = useFetchDateFilter()

  if (isPending || isError || !data || !data.dates?.length) return null

  return (
    <Container>
      {data.dates.map(({ id, trainingDate }) => (
        <Tag key={id} date={formatDate(trainingDate, 'dotDate')} />
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
