import type { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Button } from './Button'

const ModalPortal = ({ children }: PropsWithChildren) => {
  const modalRoot = document.getElementById('modal') as HTMLElement
  if (!modalRoot) return null

  return ReactDOM.createPortal(children, modalRoot)
}

type ModalBaseProps = {
  isOpen: boolean
  onClose: VoidFunction
  content: string
}

const ModalLayout = ({ isOpen, onClose, content, children }: PropsWithChildren<ModalBaseProps>) => {
  if (!isOpen) return null

  return (
    <ModalPortal>
      <ModalOverlay>
        <ModalBackdrop onClick={onClose} aria-label="모달 닫기" />
        <ModalContent>
          <ModalText>{content}</ModalText>
          {children}
        </ModalContent>
      </ModalOverlay>
    </ModalPortal>
  )
}

type ModalButtonProps = {
  label: string
  onClick: VoidFunction
  secondary?: boolean
}

type ModalWithOneButtonProps = ModalBaseProps & {
  button: ModalButtonProps
}

export const ModalWithOneButton = ({
  isOpen,
  onClose,
  content,
  button: { onClick, label, secondary },
}: ModalWithOneButtonProps) => (
  <ModalLayout isOpen={isOpen} onClose={onClose} content={content}>
    <Button size="lg" onClick={onClick} secondary={secondary}>
      {label}
    </Button>
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
  <ModalLayout isOpen={isOpen} onClose={onClose} content={content}>
    <ButtonGrid>
      <Button size="lg" onClick={secondaryButton.onClick} secondary={secondaryButton.secondary}>
        {secondaryButton.label}
      </Button>
      <Button size="lg" onClick={primaryButton.onClick} secondary={primaryButton.secondary}>
        {primaryButton.label}
      </Button>
    </ButtonGrid>
  </ModalLayout>
)

const ModalOverlay = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')};
  position: fixed;
  inset: 0;
  z-index: 20;
  width: 100%;
  height: 100svh;
`

const ModalBackdrop = styled.button`
  position: fixed;
  inset: 0;
  background-color: #d9d9d9;
  opacity: 0.58;
`

const ModalContent = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.borderRadius('lg')};
  ${({ theme }) => theme.padding('md', 'lg', 'md', 'lg')};
  position: absolute;
  min-width: 310px;
  background-color: white;
`

const ModalText = styled.p`
  ${({ theme }) => theme.font(600, theme.colors.black[600])};
  padding: 0 36px;
  text-align: center;
`

const ButtonGrid = styled.div`
  ${({ theme }) => theme.gridBox('1fr 1fr', undefined, undefined, undefined, 'lg')};
  width: 100%;
`
