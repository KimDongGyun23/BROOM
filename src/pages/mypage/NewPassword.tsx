import { NewPasswordForm } from '@/features/mypage/ui/NewPasswordForm'
import { NewPasswordModal } from '@/features/mypage/ui/NewPasswordModal'
import { ModalStoreProvider } from '@/shared/model/modal.store'

export const NewPassword = () => {
  return (
    <ModalStoreProvider>
      <NewPasswordForm />
      <NewPasswordModal />
    </ModalStoreProvider>
  )
}
