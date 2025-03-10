import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { FormContainer } from '@/app/style/commonStyles'
import { useFetchAccountInformation } from '@/entities/mypage/api/useMypage.query'
import {
  accountInformationAttribute,
  accountInformationSchema,
} from '@/entities/mypage/model/mypage.schema'
import type { AccountInformation as AccountInfo } from '@/entities/mypage/model/mypage.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { InputGroup } from '@/shared/ui/inputGroup'
import { Loading } from '@/shared/ui/Loading'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { ErrorPage } from '../home/ErrorPage'

export const AccountInformation = () => {
  const navigate = useNavigate()

  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountInformationAttribute

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
      <FormContainer $isFull>
        <InputGroup section={NICKNAME.section}>
          <InputGroup.Label label={NICKNAME.label} />
          <InputGroup.Input readOnly {...NICKNAME.input} />
        </InputGroup>

        <InputGroup section={DISCHARGE_YEAR.section}>
          <InputGroup.Label label={DISCHARGE_YEAR.label} />
          <InputGroup.Input readOnly {...DISCHARGE_YEAR.input} />
        </InputGroup>

        <InputGroup section={MILITARY_BRANCH.section}>
          <InputGroup.Label label={MILITARY_BRANCH.label} />
          <InputGroup.SortOfArmy disabled />
        </InputGroup>
      </FormContainer>
    </FormProvider>
  )
}
