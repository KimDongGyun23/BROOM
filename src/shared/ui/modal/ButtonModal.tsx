import styled from 'styled-components'

import {
  useModalActions,
  useOneButtonModalState,
  useTwoButtonModalState,
} from '@/shared/model/modal.store'

import { Button } from '../Button'

import { ModalLayout } from './ModalLayout'

type ModalButtonProps = {
  buttonLabel?: string
  onClickButton?: VoidFunction
}

export const ModalWithOneButton = ({ buttonLabel = '확인', onClickButton }: ModalButtonProps) => {
  const { isModalOpen, label } = useOneButtonModalState()
  const { closeModal } = useModalActions()

  const handleCloseButton = () => {
    if (onClickButton) onClickButton()
    closeModal()
  }

  return (
    <ModalLayout id="modal" isOpen={isModalOpen} onClose={closeModal}>
      <ModalContent>
        <ModalText>{label}</ModalText>
        <Button size="lg" onClick={handleCloseButton}>
          {buttonLabel}
        </Button>
      </ModalContent>
    </ModalLayout>
  )
}

type ModalWithTwoButtonProps = {
  primaryButton: ModalButtonProps
  secondaryButton?: ModalButtonProps
}

export const ModalWithTwoButton = ({ primaryButton, secondaryButton }: ModalWithTwoButtonProps) => {
  const { isModalOpen, label } = useTwoButtonModalState()
  const { closeModal } = useModalActions()

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
