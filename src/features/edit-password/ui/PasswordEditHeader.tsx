import { PasswordEditModal } from '@/features/edit-password/ui/PasswordEditModal'
import { ModalStoreProvider } from '@/shared/model/modal.store'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useEditPassword } from '../hook/useEditPassword'

export const SubmitHeader = () => {
  const { onSubmit } = useEditPassword()

  return <SubHeaderWithoutIcon type="complete" title="비밀번호 재설정" onClickComplete={onSubmit} />
}

export const PasswordEditHeader = () => (
  <ModalStoreProvider>
    <SubmitHeader />
    <PasswordEditModal />
  </ModalStoreProvider>
)
