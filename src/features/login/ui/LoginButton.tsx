import { ModalStoreProvider } from '@/shared/model/modal.store'
import { Button } from '@/shared/ui/Button'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

import { useLogin } from '../hook/useLogin'

const LoginButtonWithModal = () => {
  const { onSubmit } = useLogin()

  return (
    <>
      <Button size="lg" onClick={onSubmit}>
        로그인
      </Button>
      <ModalWithOneButton />
    </>
  )
}

export const LoginButton = () => {
  return (
    <ModalStoreProvider>
      <LoginButtonWithModal />
    </ModalStoreProvider>
  )
}
