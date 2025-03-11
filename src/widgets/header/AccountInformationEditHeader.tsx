import { useFormContext } from 'react-hook-form'

import type { AccountInformation } from '@/entities/mypage/model/mypage.type'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useEditAccountInformation } from '../../features/edit-account/hook/useEditAccountInformation'

import { EditAccountInformationSuccessModal } from './modal/EditAccountInformationSuccessModal'

export const AccountInformationEditHeader = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { handleSubmit } = useFormContext<AccountInformation>()

  const { handleEditAccountInformation } = useEditAccountInformation(openModal)

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="계정 정보 수정"
        onClickComplete={handleSubmit(handleEditAccountInformation)}
      />

      <EditAccountInformationSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </>
  )
}
