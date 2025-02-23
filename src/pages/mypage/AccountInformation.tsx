import { useNavigate } from 'react-router-dom'

import { useFetchAccountInformation } from '@/features/mypage/api/useMypage.query'
import { AccountInformationForm } from '@/features/mypage/ui/AccountInformationForm'
import { Loading } from '@/shared/ui/Loading'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

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
