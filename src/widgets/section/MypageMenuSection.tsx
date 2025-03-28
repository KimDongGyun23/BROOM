import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { CustomerSupportSection } from './CustomerSupportSection'

const MYPAGE_MENU_ITEMS = [
  {
    sectionTitle: '내 정보',
    links: [
      { name: '계정 정보', path: '/mypage/account-information' },
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
] as const

export const MypageMenuSection = () => (
  <Container>
    {MYPAGE_MENU_ITEMS.map(({ sectionTitle, links }, index) => (
      <Section key={sectionTitle} $hasBorder={index !== MYPAGE_MENU_ITEMS.length - 1}>
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
    <CustomerSupportSection />
  </Container>
)

const Container = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('column')}
    ${theme.margin(0, 'container')}
  `}
`

const Section = styled.section<{ $hasBorder: boolean }>`
  ${({ theme, $hasBorder }) => `
    ${theme.flexBox('column', undefined, undefined, 'xl')}
    ${theme.padding('xl', 0)}
    ${$hasBorder && theme.border('divider', 'bottom')}
  `}
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
