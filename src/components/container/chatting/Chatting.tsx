import styled from 'styled-components'

import { CarpoolChattingList } from '@/components/domain/chatting/CarpoolChattingList'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { MainHeader } from '@/components/view/MainHeader'
import { PostTabStoreProvider } from '@/stores/postTab'
import { Container } from '@/styles/commonStyles'

export const Chatting = () => {
  return (
    <PostTabStoreProvider>
      <Container>
        <MainHeader />
        <MainContent>
          <CarpoolChattingList />
        </MainContent>
        <BottomNavigation />
      </Container>
    </PostTabStoreProvider>
  )
}

const MainContent = styled.main`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.margin('container', 0)};
  flex-grow: 1;
  overflow-y: scroll;
`
