import { styled } from 'styled-components'

import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { Button } from '@/shared/ui/Button'
import { ModalLayout } from '@/shared/ui/modal/ModalLayout'

import { PRIVACY_TERM, SERVICE_TERM } from '../config/term.constant'
import type { AgreementId } from '../model/terms.store'

type TermViewButton = {
  id: AgreementId
  isModalOpen: boolean
  closeModal: VoidFunction
}

export const TermModal = ({ id, isModalOpen, closeModal }: TermViewButton) => {
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

export const TermViewButton = ({ id }: TermViewButton) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <ViewButton type="button" onClick={() => openModal(MODAL_KEYS.confirm, '')}>
        보기
      </ViewButton>
      <TermModal id={id} isModalOpen={isModalOpen(MODAL_KEYS.confirm)} closeModal={closeModal} />
    </>
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

const ViewButton = styled.button`
  ${({ theme }) => `
    ${theme.font(800, theme.colors.black[400])};
    ${theme.margin(0, 0, 0, 'auto')};
    ${theme.border('underline', 'bottom')};
  `}
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
