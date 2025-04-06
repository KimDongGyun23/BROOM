import { FormProvider } from 'react-hook-form'

import { useFetchAccountDetails } from '@/entities/mypage/api/useMypage.query'
import { accountSchema } from '@/entities/mypage/config/account.schema'
import type { AccountDetails } from '@/entities/mypage/model/mypage.type'
import { UpdateAccountForm } from '@/features/account/update-account/ui/UpdateAccountForm'
import { UpdateAccountHeader } from '@/features/account/update-account/ui/UpdateAccountHeader'
import { UpdateAccountSuccessModal } from '@/features/account/update-account/ui/UpdateAccountSuccessModal'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'

export const UpdateAccount = () => {
  const { data: defaultValues } = useFetchAccountDetails()

  const formMethod = useCustomForm<AccountDetails>(accountSchema, { defaultValues })

  if (!defaultValues) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  return (
    <FormProvider {...formMethod}>
      <UpdateAccountHeader />
      <UpdateAccountForm />

      <UpdateAccountSuccessModal />
    </FormProvider>
  )
}
