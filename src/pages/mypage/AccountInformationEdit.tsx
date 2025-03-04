import { FormProvider } from 'react-hook-form'

import { useFetchAccountInformation } from '@/entities/mypage/api/useMypage.query'
import { accountInformationSchema } from '@/entities/mypage/model/mypage.schema'
import type { AccountInformation as AccountInfo } from '@/entities/mypage/model/mypage.type'
import { AccountInformationEditHeader } from '@/features/edit-account/ui/AccountInformationEditHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { ModalStoreProvider } from '@/shared/model/modal.store'
import { Loading } from '@/shared/ui/Loading'
import { AccountInformationEditForm } from '@/widgets/account-form/ui/AccountInformationEditForm'

import { ErrorPage } from '../home/ErrorPage'

export const AccountInformationEdit = () => {
  const { data: defaultValues, isPending, isError } = useFetchAccountInformation()

  const formMethod = useCustomForm<AccountInfo>(accountInformationSchema, { defaultValues })

  if (isPending) return <Loading />
  if (isError || !defaultValues) return <ErrorPage />

  return (
    <ModalStoreProvider>
      <FormProvider {...formMethod}>
        <AccountInformationEditHeader />
        <AccountInformationEditForm />
      </FormProvider>
    </ModalStoreProvider>
  )
}
