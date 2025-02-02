import { Link } from 'react-router-dom'
import styled from 'styled-components'

type ProfileSectionProps = {
  title: string
  items: readonly { name: string; path: string }[]
  isLast: boolean
}

export const MypageContents = ({ title, items, isLast }: ProfileSectionProps) => (
  <Container $isLast={isLast}>
    <SectionTitle>{title}</SectionTitle>
    <SectionList>
      {items.map(({ name, path }) => (
        <li key={name}>
          <SectionLink to={path}>{name}</SectionLink>
        </li>
      ))}
    </SectionList>
  </Container>
)

const Container = styled.section<{ $isLast: boolean }>`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.padding('xl', 0)};
  ${({ theme, $isLast }) => !$isLast && theme.border('divider', 'bottom')};
`

const SectionTitle = styled.h6`
  color: ${({ theme }) => theme.colors.black[700]};
`

const SectionList = styled.ul`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'md')};
`

const SectionLink = styled(Link)`
  ${({ theme }) => theme.font(700, theme.colors.black[400])};
`
