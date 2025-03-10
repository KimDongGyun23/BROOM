import { useEffect } from 'react'
import type { FallbackProps } from 'react-error-boundary'

import useModal from '../hook/useModal'
import { MODAL_KEYS } from '../lib/constants'

import { ModalWithOneButton } from './modal/ButtonModal'

export const ErrorModal = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { response } = error

  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  // const isNotAuthorized = status === 401 || status === 403

  useEffect(() => {
    openModal(MODAL_KEYS.error, response?.data || '알 수 없는 오류입니다.')
  }, [openModal, resetErrorBoundary, response?.data])

  return (
    <ModalWithOneButton
      label={`${modalLabel(MODAL_KEYS.error)} 전역`}
      isModalOpen={isModalOpen(MODAL_KEYS.error)}
      closeModal={closeModal}
      button={{ onClickButton: resetErrorBoundary }}
    />
  )
}
