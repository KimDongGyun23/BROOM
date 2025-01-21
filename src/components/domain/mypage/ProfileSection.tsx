import { Link } from 'react-router-dom'
import styled from 'styled-components'

type ProfileSectionProps = {
  title: string
  items: readonly { name: string; path: string }[]
}

export const ProfileSection = ({ title, items }: ProfileSectionProps) => (
  <Container>
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

const Container = styled.section`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, theme.gap.xxl)};
`

const SectionTitle = styled.h6`
  color: ${({ theme }) => theme.colors.black[700]};
`

const SectionList = styled.ul`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, theme.gap.lg)};
`

const SectionLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize[700]};
  line-height: ${({ theme }) => theme.lineHeight[700]};
  color: ${({ theme }) => theme.colors.black[700]};
`
