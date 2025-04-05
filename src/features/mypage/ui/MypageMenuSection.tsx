import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { MYPAGE_MENU_ITEMS } from '../config/mypageMenu.constant'

export const MypageMenuSection = () => (
  <>
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
  </>
)

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
