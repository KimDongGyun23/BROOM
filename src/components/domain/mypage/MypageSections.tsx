import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MYPAGE_SECTIONS = [
  {
    sectionTitle: '내 정보',
    links: [
      { name: '계정 정보', path: '/mypage/account-info' },
      { name: '비밀번호 재설정', path: '/mypage/password' },
    ],
  },
  {
    sectionTitle: '게시글',
    links: [
      { name: '내가 올린 게시글', path: '/mypage/my-post' },
      { name: '북마크', path: '/mypage/bookmark' },
    ],
  },
  {
    sectionTitle: '고객 지원',
    links: [
      { name: '문의하기', path: '/mypage' },
      { name: '서비스 정보', path: '/mypage' },
    ],
  },
] as const

export const MypageSections = () => (
  <Container>
    {MYPAGE_SECTIONS.map(({ sectionTitle, links }, index) => (
      <Section key={sectionTitle} $hasBorder={index !== MYPAGE_SECTIONS.length - 1}>
        <SectionTitle>{sectionTitle}</SectionTitle>
        <SectionList>
          {links.map(({ name, path }) => (
            <li key={name}>
              <SectionLink to={path}>{name}</SectionLink>
            </li>
          ))}
        </SectionList>
      </Section>
    ))}
  </Container>
)

const Container = styled.section`
  ${({ theme }) => theme.flexBox('column')};
  ${({ theme }) => theme.margin(0, 'container')};
`

const Section = styled.section<{ $hasBorder: boolean }>`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.padding('xl', 0)};
  ${({ theme, $hasBorder }) => $hasBorder && theme.border('divider', 'bottom')};
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
