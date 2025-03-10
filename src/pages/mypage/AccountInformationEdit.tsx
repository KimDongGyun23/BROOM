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
import { ModalStoreProvider } from '@/shared/model/modal.store'
import { InputGroup } from '@/shared/ui/inputGroup'
import { Loading } from '@/shared/ui/Loading'

import { ErrorPage } from '../home/ErrorPage'

export const AccountInformationEdit = () => {
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountInformationAttribute

  const { data: defaultValues, isPending, isError } = useFetchAccountInformation()

  const formMethod = useCustomForm<AccountInfo>(accountInformationSchema, { defaultValues })

  if (isPending) return <Loading />
  if (isError || !defaultValues) return <ErrorPage />

  return (
    <ModalStoreProvider>
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
    </ModalStoreProvider>
  )
}
