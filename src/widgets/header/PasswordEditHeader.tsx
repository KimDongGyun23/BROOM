import { useFormContext } from 'react-hook-form'

import type { PasswordUpdateForm } from '@/entities/mypage/model/mypage.type'
import { useEditPassword } from '@/features/edit-password/hook/useEditPassword'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { EditPasswordSuccessModal } from './EditPasswordSuccessModal'

export const PasswordEditHeader = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { handleSubmit } = useFormContext<PasswordUpdateForm>()

  const { handleEditPassword } = useEditPassword(openModal)

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="비밀번호 재설정"
        onClickComplete={handleSubmit(handleEditPassword)}
      />

      <EditPasswordSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </>
  )
}
