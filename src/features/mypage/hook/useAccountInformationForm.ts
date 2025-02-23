import { useCustomForm } from '@/shared/hook/useCustomForm'

import { useFetchAccountInformation } from '../api/useMypage.query'
import { accountInformationSchema } from '../model/mypage.schema'
import type { AccountInformation } from '../model/mypage.type'

export const useAccountInformationForm = () => {
  const { data: defaultValues } = useFetchAccountInformation()
  const formMethod = useCustomForm<AccountInformation>(accountInformationSchema, { defaultValues })

  return formMethod
}
