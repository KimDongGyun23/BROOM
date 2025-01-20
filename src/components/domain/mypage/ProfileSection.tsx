import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.xxl};
`

const SectionTitle = styled.h6`
  color: ${({ theme }) => theme.colors.black[700]};
`

const SectionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.lg};
`

const SectionLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize[700]};
  line-height: ${({ theme }) => theme.lineHeight[700]};
  color: ${({ theme }) => theme.colors.black[700]};
`

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
