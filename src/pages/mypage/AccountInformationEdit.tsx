import { FormProvider } from 'react-hook-form'

import { FormContainer } from '@/app/style/commonStyles'
import { useFetchAccountInformation } from '@/entities/mypage/api/useMypage.query'
import {
  accountInformationAttribute,
  accountInformationSchema,
} from '@/entities/mypage/model/mypage.schema'
import type { AccountInformation as AccountInfo } from '@/entities/mypage/model/mypage.type'
import { NicknameDuplicationCheckField } from '@/features/check-nickname-duplication/ui/NicknameDuplicationCheckField'
import { AccountInformationEditHeader } from '@/features/edit-account/ui/AccountInformationEditHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { InputGroup } from '@/shared/ui/inputGroup'

export const AccountInformationEdit = () => {
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountInformationAttribute

  const { data: defaultValues } = useFetchAccountInformation()

  const formMethod = useCustomForm<AccountInfo>(accountInformationSchema, { defaultValues })

  if (!defaultValues) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  return (
    <FormProvider {...formMethod}>
      <AccountInformationEditHeader />
      <FormContainer $isFull>
        <NicknameDuplicationCheckField {...NICKNAME} />

        <InputGroup section={DISCHARGE_YEAR.section}>
          <InputGroup.Label label={DISCHARGE_YEAR.label} />
          <InputGroup.NumberInput {...DISCHARGE_YEAR.input} />
        </InputGroup>

        <InputGroup section={MILITARY_BRANCH.section}>
          <InputGroup.Label label={MILITARY_BRANCH.label} />
          <InputGroup.SortOfArmy />
        </InputGroup>
      </FormContainer>
    </FormProvider>
  )
}
