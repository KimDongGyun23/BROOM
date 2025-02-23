import styled from 'styled-components'

import { Button } from '../Button'

import { ModalLayout } from './ModalLayout'

type ModalBaseProps = {
  isOpen: boolean
  onClose: VoidFunction
  content: string
}

type ModalButtonProps = {
  label: string
  onClick: VoidFunction
  secondary?: boolean
}

type ModalWithOneButtonProps = ModalBaseProps & {
  isOpen: boolean
  onClose: VoidFunction
  content: string
  button: ModalButtonProps
}

export const ModalWithOneButton = ({
  isOpen,
  onClose,
  content,
  button: { onClick, label, secondary },
}: ModalWithOneButtonProps) => (
  <ModalLayout id="modal" isOpen={isOpen} onClose={onClose}>
    <ModalContent>
      <ModalText>{content}</ModalText>
      <Button size="lg" onClick={onClick} secondary={secondary}>
        {label}
      </Button>
    </ModalContent>
  </ModalLayout>
)

type ModalWithTwoButtonProps = ModalBaseProps & {
  primaryButton: ModalButtonProps
  secondaryButton: ModalButtonProps
}

export const ModalWithTwoButton = ({
  isOpen,
  onClose,
  content,
  primaryButton,
  secondaryButton,
}: ModalWithTwoButtonProps) => (
  <ModalLayout id="modal" isOpen={isOpen} onClose={onClose}>
    <ModalContent>
      <ModalText>{content}</ModalText>
      <ButtonGrid>
        <Button size="lg" onClick={secondaryButton.onClick} secondary={secondaryButton.secondary}>
          {secondaryButton.label}
        </Button>
        <Button size="lg" onClick={primaryButton.onClick} secondary={primaryButton.secondary}>
          {primaryButton.label}
        </Button>
      </ButtonGrid>
    </ModalContent>
  </ModalLayout>
)

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
