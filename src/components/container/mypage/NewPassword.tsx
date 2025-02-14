import { NewPasswordForm } from '@/components/domain/mypage/NewPasswordForm'
import { NewPasswordModal } from '@/components/domain/mypage/NewPasswordModal'
import { ModalStoreProvider } from '@/stores/modal'

export const NewPassword = () => {
  return (
    <ModalStoreProvider>
      <NewPasswordForm />
      <NewPasswordModal />
    </ModalStoreProvider>
  )
}
