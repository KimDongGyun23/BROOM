import { useNavigate } from 'react-router-dom'

import { AccountInformationForm } from '@/components/domain/mypage/AccountInformationForm'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useFetchAccountInformation } from '@/query/useMypageQuery'

import { ErrorPage } from '../home/ErrorPage'

export const AccountInformation = () => {
  const navigate = useNavigate()
  const { isPending, isError } = useFetchAccountInformation()

  const handleClickEdit = () => navigate('/mypage/account-information/edit', { replace: true })

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <>
      <SubHeaderWithoutIcon type="edit" title="계정 정보" onClickEdit={handleClickEdit} />
      <AccountInformationForm />
    </>
  )
}
