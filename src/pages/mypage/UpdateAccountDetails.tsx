import { FormProvider } from 'react-hook-form'

import { FormContainer } from '@/app/style/commonStyles'
import { useFetchAccountDetails } from '@/entities/mypage/api/useMypage.query'
import { accountAttribute, accountSchema } from '@/entities/mypage/model/mypage.schema'
import type { AccountDetails } from '@/entities/mypage/model/mypage.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { InputGroup } from '@/shared/ui/inputGroup'
import { UpdateAccountHeader } from '@/widgets/header/EditAccountHeader'
import { NicknameDuplicationCheckField } from '@/widgets/input-field/NicknameDuplicationCheckField'

export const UpdateAccountDetails = () => {
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountAttribute

  const { data: defaultValues } = useFetchAccountDetails()

  const formMethod = useCustomForm<AccountDetails>(accountSchema, { defaultValues })

  if (!defaultValues) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  return (
    <FormProvider {...formMethod}>
      <UpdateAccountHeader />
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
