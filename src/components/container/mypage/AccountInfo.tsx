import { FormProvider } from 'react-hook-form'

import { AccountForm } from '@/components/domain/mypage/AccountForm'
import { Loading } from '@/components/view/Loading'
import { ModalWithOneButton } from '@/components/view/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useAccountForm } from '@/forms/useAccountForm'
import { useAccountActions, useAccountModeState, useModalState } from '@/stores/account'

import { ErrorPage } from '../home/ErrorPage'

export const AccountInfo = () => {
  const isEditMode = useAccountModeState()
  const { isSuccessModalOpen, isErrorModalOpen } = useModalState()
  const { toggleEditMode, setModalState } = useAccountActions()

  const { isPending, isError, formMethod, onSubmit } = useAccountForm()

  const handleCloseModal = () =>
    setModalState({ isSuccessModalOpen: false, isErrorModalOpen: false })

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <>
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon
          type={isEditMode ? 'complete' : 'edit'}
          title="계정 정보"
          onClickEdit={toggleEditMode}
          onClickComplete={onSubmit}
        />
        <AccountForm />
      </FormProvider>

      <ModalWithOneButton
        isOpen={isSuccessModalOpen}
        onClose={handleCloseModal}
        content="계정 정보가 수정되었습니다."
        button={{ onClick: handleCloseModal, label: '확인' }}
      />

      <ModalWithOneButton
        isOpen={isErrorModalOpen}
        onClose={handleCloseModal}
        content="계정 정보 업데이트에 실패했습니다."
        button={{ onClick: handleCloseModal, label: '확인' }}
      />
    </>
  )
}
