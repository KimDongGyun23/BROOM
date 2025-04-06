import { styled } from 'styled-components'

import { PRIVACY_TERM, SERVICE_TERM } from '@/entities/auth/config/term.constant'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useModalActions, useModalState } from '@/shared/model/modal.store'
import { Button } from '@/shared/ui/Button'
import { ModalLayout } from '@/shared/ui/modal/ModalLayout'

import type { AgreementId } from '../model/terms.store'

type Props = {
  id: AgreementId
}

export const TermModal = ({ id }: Props) => {
  const modalState = useModalState()

  const { closeModal } = useModalActions()

  const isModalOpen = modalState[MODAL_KEYS.LOGOUT]?.isOpen || false

  const term = id === 'personalConsent' ? PRIVACY_TERM : SERVICE_TERM

  return (
    <ModalLayout id="modal" isOpen={isModalOpen} onClose={closeModal}>
      <ModalContent>
        <ScrollSection>
          {term.map(({ title, content }) => (
            <div key={title}>
              <Title>{title}</Title>
              <Content>{content}</Content>
            </div>
          ))}
        </ScrollSection>
        <Button size="lg" onClick={closeModal}>
          닫기
        </Button>
      </ModalContent>
    </ModalLayout>
  )
}

const ModalContent = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined)};
    ${theme.borderRadius('md')};
    ${theme.padding('md', 'lg')};
  `}
  position: absolute;
  min-width: 310px;
  max-width: 80%;
  background-color: white;
`

const ScrollSection = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'lg')}
    ${theme.margin('xl')}
  `}
  height: 60svh;
  overflow-y: scroll;
  white-space: pre-wrap;
`

const Title = styled.h6`
  ${({ theme }) => theme.font(800, theme.colors.black[600])}
`

const Content = styled.p`
  ${({ theme }) => theme.font(900, theme.colors.black[400])}
`
