import { Button } from '@/shared/ui/Button'

import { useLogin } from '../hook/useLogin'

export const LoginButton = () => {
  // const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  // const { onSubmit } = useLogin(openModal)
  const { onSubmit } = useLogin()

  return (
    <>
      <Button size="lg" onClick={onSubmit}>
        로그인
      </Button>

      {/* <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.error)}
        closeModal={closeModal}
        button={{ onClickButton: closeModal }}
      /> */}
    </>
  )
}
