import React from 'react'
import { styled } from 'styled-components'

import { TermModal } from '@/features/agree-term/ui/TermViewButton'
import useModal from '@/shared/hook/useModal'
import { ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

const CUSTOMER_SUPPORT = {
  sectionTitle: '고객 지원',
  links: [{ name: '문의하기' }, { name: '서비스 이용 약관' }, { name: '개인정보 처리 방침' }],
} as const

const CHANNEL = import.meta.env.VITE_KAKAO

type SectionModalType = {
  index: number
  isModalOpen: boolean
  closeModal: VoidFunction
}

const SectionModal = ({ index, isModalOpen, closeModal }: SectionModalType) => {
  switch (index) {
    case 0:
      return (
        <ModalWithTwoButton
          label="문의하기 채널로 이동하시겠습니까?"
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          primaryButton={{
            buttonLabel: '확인',
            onClickButton: () => {
              window.open(CHANNEL, '_blank')
              closeModal()
            },
          }}
        />
      )
    case 1:
      return <TermModal id="personalConsent" isModalOpen={isModalOpen} closeModal={closeModal} />
    case 2:
      return <TermModal id="serviceConsent" isModalOpen={isModalOpen} closeModal={closeModal} />
    default:
      return null
  }
}

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
