import { ModalStoreProvider } from '@/shared/model/modal.store'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useEditAccountInformation } from '../hook/useEditAccountInformation'

import { AccountInformationEditModal } from './AccountInformationEditModal'

export const SubmitHeader = () => {
  const { onSubmit } = useEditAccountInformation()
  return <SubHeaderWithoutIcon type="complete" title="계정 정보 수정" onClickComplete={onSubmit} />
}

export const AccountInformationEditHeader = () => (
  <ModalStoreProvider>
    <SubmitHeader />
    <AccountInformationEditModal />
  </ModalStoreProvider>
)
