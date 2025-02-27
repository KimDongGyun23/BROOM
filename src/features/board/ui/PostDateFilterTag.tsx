import styled from 'styled-components'

import { useDateFilter, useDateFilterActions } from '../model/dateFilter.store'

type TagProps = {
  date: string
}

const Tag = ({ date }: TagProps) => {
  const selectedDate = useDateFilter()
  const { setDateFilter } = useDateFilterActions()

  const isSelected = selectedDate === date

  const handleClick = () => {
    setDateFilter(isSelected ? null : date)
  }

  return (
    <TagButton onClick={handleClick} $isSelected={isSelected}>
      {date}
    </TagButton>
  )
}

export const PostDateFilterTag = () => {
  const list = ['05/21', '05/22']

  return (
    <Container>
      {list.map((date) => (
        <Tag key={date} date={date} />
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
