import React from 'react'
import { styled } from 'styled-components'

import useModal from '@/shared/hook/useModal'

import { CUSTOMER_SUPPORT } from '../config/mypageMenu.constant'

import { SectionModal } from './SectionModal'

export const CustomerSupportSection = () => {
  const { sectionTitle, links } = CUSTOMER_SUPPORT
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <Section>
      <SectionTitle>{sectionTitle}</SectionTitle>
      <SectionList>
        {links.map(({ name }, index) => (
          <React.Fragment key={name}>
            <li>
              <SectionItemButton onClick={() => openModal(name, '')}>{name}</SectionItemButton>
            </li>
            <SectionModal index={index} isModalOpen={isModalOpen(name)} closeModal={closeModal} />
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
