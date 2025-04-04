import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useFetchAccountDetails } from '@/entities/mypage/api/useMypage.query'
import type { AccountDetails } from '@/entities/mypage/model/mypage.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { AccountInformationForm } from '@/widgets/form/AccountInformationForm'
import { accountSchema } from '@/widgets/form/schema/account.schema'

export const AccountInformation = () => {
  const navigate = useNavigate()

  const { data: defaultValues } = useFetchAccountDetails()

  const formMethod = useCustomForm<AccountDetails>(accountSchema, { defaultValues })

  const handleClickEditButton = () =>
    navigate('/mypage/account-information/edit', { replace: true })

  return (
    <FormProvider {...formMethod}>
      <SubHeaderWithoutIcon type="edit" title="계정 정보" onClickEdit={handleClickEditButton} />
      <AccountInformationForm />
    </FormProvider>
  )
}
