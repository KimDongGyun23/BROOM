import { styled } from 'styled-components'

import { AdminBusTable } from '@/components/domain/admin/AdminBusTable'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { ModalStoreProvider } from '@/stores/modal'
import { Container } from '@/styles/commonStyles'

export const AdminBus = () => {
  return (
    <ModalStoreProvider>
      <Container>
        <SubHeaderWithoutIcon type="null" title="버스 신청 현황" />

        <MainContent>
          <AdminBusTable />
        </MainContent>
      </Container>
    </ModalStoreProvider>
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
