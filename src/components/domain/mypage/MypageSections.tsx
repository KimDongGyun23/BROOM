import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MYPAGE_PROFILE_SECTIONS = [
  {
    title: '내 정보',
    items: [
      { name: '계정 정보', path: '/mypage/account-info' },
      { name: '비밀번호 재설정', path: '/mypage/password' },
    ],
  },
  {
    title: '게시글',
    items: [
      { name: '내가 올린 게시글', path: '/mypage/myboard' },
      { name: '북마크', path: '/mypage/bookmark' },
    ],
  },
  {
    title: '고객 지원',
    items: [
      { name: '문의하기', path: '/mypage' },
      { name: '서비스 정보', path: '/mypage' },
    ],
  },
] as const

export const MypageSections = () => (
  <Section>
    {MYPAGE_PROFILE_SECTIONS.map(({ title, items }, index) => (
      <Container key={title} $isLast={index === MYPAGE_PROFILE_SECTIONS.length - 1}>
        <SectionTitle>{title}</SectionTitle>
        <SectionList>
          {items.map(({ name, path }) => (
            <li key={name}>
              <SectionLink to={path}>{name}</SectionLink>
            </li>
          ))}
        </SectionList>
      </Container>
    ))}
  </Section>
)

const Section = styled.section`
  ${({ theme }) => theme.flexBox('column')};
  ${({ theme }) => theme.margin(0, 'container')};
`

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
