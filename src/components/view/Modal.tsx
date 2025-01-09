import type { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'

import { Button } from './Button'

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
  button: ModalButtonProps
}

type ModalWithTwoButtonProps = ModalBaseProps & {
  primaryButton: ModalButtonProps
  secondaryButton: ModalButtonProps
}

const ModalPortal = ({ children }: PropsWithChildren) => {
  const modalRoot = document.getElementById('modal') as HTMLElement
  if (!modalRoot) return null

  return ReactDOM.createPortal(children, modalRoot)
}

const ModalLayout = ({ isOpen, onClose, content, children }: PropsWithChildren<ModalBaseProps>) => {
  if (!isOpen) return null

  return (
    <ModalPortal>
      <div className="flex-center fixed inset-0 z-20 h-svh w-full">
        <button
          className="fixed inset-0 bg-[#D9D9D9] opacity-[58%]"
          onClick={onClose}
          aria-label="모달 닫기"
        />
        <div className="flex-column absolute min-w-[310px] gap-4 rounded-xl bg-white px-4 py-[10px]">
          <p className="p-600 py-9 text-center text-black-600">{content}</p>
          {children}
        </div>
      </div>
    </ModalPortal>
  )
}

export const ModalWithOneButton = ({
  isOpen,
  onClose,
  content,
  button: { onClick, label, secondary },
}: ModalWithOneButtonProps) => (
  <ModalLayout isOpen={isOpen} onClose={onClose} content={content}>
    <Button size="lg" onClick={onClick} secondary={secondary} className="w-full">
      {label}
    </Button>
  </ModalLayout>
)

export const ModalWithTwoButton = ({
  isOpen,
  onClose,
  content,
  primaryButton,
  secondaryButton,
}: ModalWithTwoButtonProps) => (
  <ModalLayout isOpen={isOpen} onClose={onClose} content={content}>
    <div className="grid w-full grid-cols-2 gap-4">
      <Button
        size="lg"
        onClick={secondaryButton.onClick}
        secondary={secondaryButton.secondary}
        className="w-full"
      >
        {secondaryButton.label}
      </Button>
      <Button
        size="lg"
        onClick={primaryButton.onClick}
        secondary={primaryButton.secondary}
        className="w-full"
      >
        {primaryButton.label}
      </Button>
    </div>
  </ModalLayout>
)
