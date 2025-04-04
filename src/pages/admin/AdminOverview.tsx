import styled from 'styled-components'

import { useFetchAdminOverviewData } from '@/entities/admin/api/useAdmin.query'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const AdminOverview = () => {
  const queries = useFetchAdminOverviewData()

  const totalPostCount = queries[0].data.boardCount || '조회 불가'
  const totalUserCount = queries[1].data.userCount || '조회 불가'

  return (
    <>
      <SubHeaderWithoutIcon type="null" title="운영 현황" />

      <OverviewContainer>
        <AdminInformationContainer>
          <AdminLabel>총 가입된 회원 수</AdminLabel>
          <AdminCount>{totalUserCount}</AdminCount>
        </AdminInformationContainer>

        <AdminInformationContainer>
          <AdminLabel>총 게시글 수</AdminLabel>
          <AdminCount>{totalPostCount}</AdminCount>
        </AdminInformationContainer>
      </OverviewContainer>
    </>
  )
}

const OverviewContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.margin('container')};
  height: 100%;
`

const AdminInformationContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')}
`

const AdminLabel = styled.p`
  ${({ theme }) => theme.font(700, theme.colors.black[600])}
`

const AdminCount = styled.p`
  ${({ theme }) => theme.font(700, theme.colors.blue[500])}
`
