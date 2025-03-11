import { styled } from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { TotalApplicantCount } from '@/widgets/section/TotalApplicantCount'
import { BusApplicantTable } from '@/widgets/table/BusApplicantTable'

export const AdminBus = () => {
  return (
    <>
      <Container>
        <SubHeaderWithoutIcon type="null" title="버스 신청 현황" />

        <MainContent>
          <TotalApplicantCount />
          <BusApplicantTable />
        </MainContent>
      </Container>
    </>
  )
}

const MainContent = styled.main`
  ${({ theme }) => theme.margin(0, 'container')};
  ${({ theme }) => theme.padding('xl', 0)};
  flex-grow: 1;
  overflow-y: scroll;

  .main-title {
    ${({ theme }) => theme.font(500, theme.colors.blue[500])};
  }
`
