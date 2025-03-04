import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useFetchAccountInformation } from '@/entities/mypage/api/useMypage.query'
import { accountInformationSchema } from '@/entities/mypage/model/mypage.schema'
import type { AccountInformation as AccountInfo } from '@/entities/mypage/model/mypage.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { Loading } from '@/shared/ui/Loading'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { AccountInformationForm } from '@/widgets/account-form/ui/AccountInformationForm'

import { ErrorPage } from '../home/ErrorPage'

export const AccountInformation = () => {
  const navigate = useNavigate()

  const { data: defaultValues, isPending, isError } = useFetchAccountInformation()

  const formMethod = useCustomForm<AccountInfo>(accountInformationSchema, { defaultValues })

  if (isPending) return <Loading />
  if (isError || !defaultValues) return <ErrorPage />

  return (
    <FormProvider {...formMethod}>
      <SubHeaderWithoutIcon
        type="edit"
        title="계정 정보"
        onClickEdit={() => navigate('/mypage/account-information/edit', { replace: true })}
      />
      <AccountInformationForm />
    </FormProvider>
  )
}
