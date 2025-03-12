import styled from 'styled-components'

import { useFetchAdminOverviewData } from '@/entities/admin/api/useAdmin.query'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { AdminCountSection } from '@/widgets/section/AdminCountSection'

export const AdminOverview = () => {
  const queries = useFetchAdminOverviewData()

  const busApplicantCount = queries[0].data.reservationCount || '조회 불가'
  const totalPostCount = queries[1].data.boardCount || '조회 불가'
  const totalUserCount = queries[2].data.userCount || '조회 불가'

  return (
    <>
      <SubHeaderWithoutIcon type="null" title="운영 현황" />

      <OverviewContainer>
        <AdminCountSection label="총 가입된 회원 수" count={totalUserCount} />
        <AdminCountSection label="총 게시글 수" count={totalPostCount} />
        <AdminCountSection label="버스 신청 인원 수" count={busApplicantCount} />
      </OverviewContainer>
    </>
  )
}

const OverviewContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.margin('container')};
  height: 100%;
`
