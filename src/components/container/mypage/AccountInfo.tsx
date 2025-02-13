import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { InputGroup } from '@/components/view/inputGroup'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { accountAttribute, useAccountForm } from '@/forms/useAccountForm'
import { useFetchAccountInfo } from '@/query/useMypageQuery'
import { FormContainer } from '@/styles/commonStyles'

import { ErrorPage } from '../home/ErrorPage'

const AccountInfoForm = () => {
  const formMethod = useAccountForm()
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountAttribute

  return (
    <FormProvider {...formMethod}>
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

export const AccountInfo = () => {
  const navigate = useNavigate()
  const { isPending, isError } = useFetchAccountInfo()

  const handleClickEdit = () => navigate('/mypage/account-info/edit', { replace: true })

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <>
      <SubHeaderWithoutIcon type="edit" title="계정 정보" onClickEdit={handleClickEdit} />
      <AccountInfoForm />
    </>
  )
}
