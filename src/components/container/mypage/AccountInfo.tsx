import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { InputGroup } from '@/components/view/inputGroup'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { accountAttribute, useAccountForm } from '@/forms/useAccountForm'
import { useFetchAccountInfo } from '@/services/query/useMypageQuery'
import { FormContainer } from '@/styles/commonStyles'

import { ErrorPage } from '../home/ErrorPage'

export const AccountInfo = () => {
  const navigate = useNavigate()
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountAttribute

  const { isPending, isError } = useFetchAccountInfo()
  const { formMethod } = useAccountForm()

  const handleClickEdit = () => navigate('/mypage/account-info/edit')

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <>
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon type="edit" title="계정 정보" onClickEdit={handleClickEdit} />
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
    </>
  )
}
