import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useEditPassword } from '../hook/useEditPassword'

import { EditPasswordErrorModal } from './EditPasswordErrorModal'
import { EditPasswordSuccessModal } from './EditPasswordSuccessModal'

export const PasswordEditHeader = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  const { onSubmit } = useEditPassword(openModal)

  return (
    <>
      <SubHeaderWithoutIcon type="complete" title="비밀번호 재설정" onClickComplete={onSubmit} />

      <EditPasswordSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />

      <EditPasswordErrorModal
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.error)}
        closeModal={closeModal}
      />
    </>
  )
}
