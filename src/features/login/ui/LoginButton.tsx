import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { Button } from '@/shared/ui/Button'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

import { useLogin } from '../hook/useLogin'

export const LoginButton = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  const { onSubmit } = useLogin(openModal)

  return (
    <>
      <Button size="lg" onClick={onSubmit}>
        로그인
      </Button>

      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.error)}
        closeModal={closeModal}
        button={{ onClickButton: closeModal }}
      />
    </>
  )
}
