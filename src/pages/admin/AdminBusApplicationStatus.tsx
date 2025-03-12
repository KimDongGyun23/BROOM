import { styled } from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { useFetchBusApplicantList } from '@/entities/admin/api/useAdmin.query'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { BusApplicantListTable } from '@/widgets/table/BusApplicantListTable'

export const AdminBusApplicationStatus = () => {
  const { data: applicantList, isError } = useFetchBusApplicantList()

  if (isError) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="버스 신청 현황" />

      <MainContentContainer>
        <SummaryText>총인원 수: {applicantList.result.length}</SummaryText>
        <BusApplicantListTable applicantList={applicantList.result} />
      </MainContentContainer>
    </Container>
  )
}

const MainContentContainer = styled.main`
  ${({ theme }) => theme.margin(0, 'container')};
  ${({ theme }) => theme.padding('xl', 0)};
  flex-grow: 1;
  overflow-y: scroll;

  .main-title {
    ${({ theme }) => theme.font(500, theme.colors.blue[500])};
  }
`

const SummaryText = styled.p`
  ${({ theme }) => `
    ${theme.font(700, theme.colors.black[600])};
    ${theme.margin(0, 0, 'sm')};
  `}
`
