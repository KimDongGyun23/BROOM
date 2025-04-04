import { FormProvider } from 'react-hook-form'

import { useFetchAccountDetails } from '@/entities/mypage/api/useMypage.query'
import type { AccountDetails } from '@/entities/mypage/model/mypage.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { accountSchema } from '@/widgets/form/schema/account.schema'
import { UpdateAccountForm } from '@/widgets/form/UpdateAccountForm'
import { UpdateAccountHeader } from '@/widgets/header/EditAccountHeader'

export const UpdateAccountDetails = () => {
  const { data: defaultValues } = useFetchAccountDetails()

  const formMethod = useCustomForm<AccountDetails>(accountSchema, { defaultValues })

  if (!defaultValues) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  return (
    <FormProvider {...formMethod}>
      <UpdateAccountHeader />
      <UpdateAccountForm />
    </FormProvider>
  )
}
