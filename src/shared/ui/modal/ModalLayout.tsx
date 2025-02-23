import type { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import { styled } from 'styled-components'

type ModalLayoutProps = {
  id: string
  isOpen: boolean
  onClose: VoidFunction
}

const ModalPortal = ({ id, children }: PropsWithChildren<Pick<ModalLayoutProps, 'id'>>) => {
  const modalRoot = document.getElementById(id) as HTMLElement
  if (!modalRoot) return null

  return ReactDOM.createPortal(children, modalRoot)
}

export const ModalLayout = ({
  id,
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalLayoutProps>) => {
  if (!isOpen) return null

  return (
    <ModalPortal id={id}>
      <ModalContainer>
        <ModalOverlay>
          <ModalBackdrop onClick={onClose} aria-label="모달 닫기" />
          {children}
        </ModalOverlay>
      </ModalContainer>
    </ModalPortal>
  )
}

const ModalContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')};
  position: fixed;
  inset: 0;
  z-index: 20;
  width: 100vw;
  height: 100svh;
`

const ModalOverlay = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')};
  position: relative;
  min-width: 320px;
  max-width: 450px;
  width: 100%;
  height: 100svh;
`

const ModalBackdrop = styled.button`
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
  opacity: 0.58;
`
