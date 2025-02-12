import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { AccountInfoEditForm } from '@/components/domain/mypage/AccountInfoEditForm'
import { Loading } from '@/components/view/Loading'
import { ModalWithOneButton } from '@/components/view/Modal'
import { useAccountForm } from '@/forms/useAccountForm'
import { useFetchAccountInfo } from '@/services/query/useMypageQuery'
import { ModalStoreProvider, useModalActions, useModalState } from '@/stores/modal'

import { ErrorPage } from '../home/ErrorPage'

const AccountInfoModal = () => {
  const navigate = useNavigate()
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  const handleClose = () => {
    navigate('/mypage', { replace: true })
    closeModal()
  }

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{ onClick: handleClose, label: '확인' }}
    />
  )
}

export const AccountInfoEdit = () => {
  const { isPending, isError } = useFetchAccountInfo()
  const formMethod = useAccountForm()

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <ModalStoreProvider>
      <FormProvider {...formMethod}>
        <AccountInfoEditForm />
      </FormProvider>
      <AccountInfoModal />
    </ModalStoreProvider>
  )
}
