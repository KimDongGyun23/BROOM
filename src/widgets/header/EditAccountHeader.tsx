import { useFormContext } from 'react-hook-form'

import type { AccountDetails } from '@/entities/mypage/model/mypage.type'
import { useUpdateAccountDetails } from '@/features/edit-account/hook/useUpdateAccountDetails'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { UpdateAccountDetailsSuccessModal } from './modal/UpdateAccountDetailsSuccessModal'

export const UpdateAccountHeader = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { handleSubmit } = useFormContext<AccountDetails>()

  const { handleUpdateAccountDetails } = useUpdateAccountDetails(openModal)

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="계정 정보 수정"
        onClickComplete={handleSubmit(handleUpdateAccountDetails)}
      />

      <UpdateAccountDetailsSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </>
  )
}
