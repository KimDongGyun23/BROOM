import React from 'react'
import { styled } from 'styled-components'

import { useModalActions } from '@/shared/model/modal.store'

import { CUSTOMER_SUPPORT } from '../config/mypageMenu.constant'

import { SectionModal } from './SectionModal'

export const CustomerSupportSection = () => {
  const { sectionTitle, links } = CUSTOMER_SUPPORT
  const { openModal } = useModalActions()

  const openSectionModal = (index: number, name: string) => {
    switch (index) {
      case 0:
        return openModal(name, '문의하기 채널로 이동하시겠습니까?')
      case 1:
        return openModal('personalConsent', '')
      case 2:
        return openModal('serviceConsent', '')
      default:
        return null
    }
  }

  return (
    <Section>
      <SectionTitle>{sectionTitle}</SectionTitle>
      <SectionList>
        {links.map(({ name }, index) => (
          <React.Fragment key={name}>
            <li>
              <SectionItemButton onClick={() => openSectionModal(index, name)}>
                {name}
              </SectionItemButton>
            </li>
            <SectionModal index={index} name={name} />
          </React.Fragment>
        ))}
      </SectionList>
    </Section>
  )
}

const Section = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'xl')}
    ${theme.padding('xl', 0)}
  `}
`

const SectionTitle = styled.h6`
  color: ${({ theme }) => theme.colors.black[700]};
`

const SectionList = styled.ul`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'md')};
`

const SectionItemButton = styled.button`
  ${({ theme }) => theme.font(700, theme.colors.black[400])};
`
