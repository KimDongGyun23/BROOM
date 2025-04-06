import styled from 'styled-components'

import { useModalActions, useModalState } from '@/shared/model/modal.store'

import { Button } from '../Button'

import { ModalLayout } from './ModalLayout'

type ModalButtonProps = {
  buttonLabel?: string
  onClickButton?: VoidFunction
}

type ModalProps = {
  modalKey: string
}

export type ModalWithOneButtonProps = ModalProps & {
  button: ModalButtonProps
}

export const ModalWithOneButton = ({
  modalKey,
  button: { buttonLabel = '확인', onClickButton },
}: ModalWithOneButtonProps) => {
  const modal = useModalState()

  const { closeModal } = useModalActions()

  const isModalOpen = modal[modalKey].isOpen
  const label = modal[modalKey].label

  const handleCloseButton = () => {
    if (onClickButton) onClickButton()
    closeModal()
  }

  return (
    <ModalLayout id="modal" isOpen={isModalOpen} onClose={handleCloseButton}>
      <ModalContent>
        <ModalText>{label}</ModalText>
        <Button size="lg" onClick={handleCloseButton}>
          {buttonLabel}
        </Button>
      </ModalContent>
    </ModalLayout>
  )
}

export type ModalWithTwoButtonProps = ModalProps & {
  primaryButton: ModalButtonProps
  secondaryButton?: ModalButtonProps
}

export const ModalWithTwoButton = ({
  modalKey,
  primaryButton,
  secondaryButton,
}: ModalWithTwoButtonProps) => {
  const modal = useModalState()

  const { closeModal } = useModalActions()

  const isModalOpen = modal[modalKey].isOpen
  const label = modal[modalKey].label

  const { buttonLabel: primaryButtonLabel, onClickButton: onClickPrimaryButton } = primaryButton
  const { buttonLabel: secondaryButtonLabel, onClickButton: onClickSecondaryButton } =
    secondaryButton || {}

  const handleClickButton = (onClickButton?: VoidFunction) => {
    if (onClickButton) onClickButton()
    closeModal()
  }

  return (
    <ModalLayout id="modal" isOpen={isModalOpen} onClose={closeModal}>
      <ModalContent>
        <ModalText>{label}</ModalText>
        <ButtonGrid>
          <Button size="lg" onClick={() => handleClickButton(onClickSecondaryButton)} secondary>
            {secondaryButtonLabel ? secondaryButtonLabel : '취소'}
          </Button>
          <Button size="lg" onClick={onClickPrimaryButton}>
            {primaryButtonLabel}
          </Button>
        </ButtonGrid>
      </ModalContent>
    </ModalLayout>
  )
}

const ModalContent = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined)};
  ${({ theme }) => theme.borderRadius('md')};
  ${({ theme }) => theme.padding('md', 'lg')};
  position: absolute;
  min-width: 310px;
  background-color: white;
`

const ModalText = styled.p`
  ${({ theme }) => theme.font(600, theme.colors.black[600])};
  ${({ theme }) => theme.padding('modal')};
  text-align: center;
  white-space: pre-wrap;
`

const ButtonGrid = styled.div`
  ${({ theme }) => theme.gridBox('1fr 1fr', undefined, undefined, undefined, 'lg')};
  width: 100%;
`
