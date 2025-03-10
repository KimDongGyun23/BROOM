import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useEditAccountInformation } from '../hook/useEditAccountInformation'

import { EditAccountInformationSuccessModal } from './EditAccountInformationSuccessModal'

export const AccountInformationEditHeader = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  const { onSubmit } = useEditAccountInformation(openModal)

  return (
    <>
      <SubHeaderWithoutIcon type="complete" title="계정 정보 수정" onClickComplete={onSubmit} />
      <EditAccountInformationSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </>
  )
}
