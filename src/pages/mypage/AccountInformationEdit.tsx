import { FormProvider } from 'react-hook-form'

import { useFetchAccountInformation } from '@/features/mypage/api/useMypage.query'
import { useAccountInformationForm } from '@/features/mypage/hook/useAccountInformationForm'
import { AccountInformationEditForm } from '@/features/mypage/ui/AccountInformationEditForm'
import { AccountInformationEditModal } from '@/features/mypage/ui/AccountInformationEditModal'
import { ModalStoreProvider } from '@/shared/model/modal'
import { Loading } from '@/shared/ui/Loading'

import { ErrorPage } from '../home/ErrorPage'

export const AccountInformationEdit = () => {
  const { isPending, isError } = useFetchAccountInformation()
  const formMethod = useAccountInformationForm()

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <ModalStoreProvider>
      <FormProvider {...formMethod}>
        <AccountInformationEditForm />
      </FormProvider>
      <AccountInformationEditModal />
    </ModalStoreProvider>
  )
}
