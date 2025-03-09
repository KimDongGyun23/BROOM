import React from 'react'
import { styled } from 'styled-components'

import { TermModal } from '@/features/agree-term/ui/TermViewButton'
import { ModalStoreProvider, useModalActions } from '@/shared/model/modal.store'

const CUSTOMER_SUPPORT = {
  sectionTitle: '고객 지원',
  links: [
    { name: '자주 묻는 질문' },
    { name: '문의하기' },
    { name: '서비스 이용 약관' },
    { name: '개인정보 처리 방침' },
  ],
} as const

const SectionModal = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return null
    case 1:
      return null
    case 2:
      return <TermModal id="personalConsent" />
    case 3:
      return <TermModal id="serviceConsent" />
    default:
      return null
  }
}

export const CustomerSupportSection = () => {
  const { sectionTitle, links } = CUSTOMER_SUPPORT
  const { openOneButtonModal } = useModalActions()

  return (
    <Section>
      <SectionTitle>{sectionTitle}</SectionTitle>
      <SectionList>
        <ModalStoreProvider>
          {links.map(({ name }, index) => (
            <React.Fragment key="name">
              <li>
                <SectionItemButton onClick={() => openOneButtonModal('')}>{name}</SectionItemButton>
              </li>
              <SectionModal index={index} />
            </React.Fragment>
          ))}
        </ModalStoreProvider>
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
