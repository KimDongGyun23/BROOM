import { FormProvider } from 'react-hook-form'

import { AccountInformationEditForm } from '@/components/domain/mypage/AccountInformationEditForm'
import { AccountInformationEditModal } from '@/components/domain/mypage/AccountInformationEditModal'
import { useAccountInformationForm } from '@/forms/useAccountInformationForm'
import { useFetchAccountInformation } from '@/query/useMypageQuery'
import { ModalStoreProvider } from '@/shared/model/modal'
import { Loading } from '@/shared/ui/Loading'

import { ErrorPage } from '../../../pages/home/ErrorPage'

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
