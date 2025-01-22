import styled from 'styled-components'

import { CarpoolChattingList } from '@/components/domain/chatting/CarpoolChattingList'
import { PostTabs } from '@/components/domain/post/PostTabs'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { MainHeader } from '@/components/view/MainHeader'
import { PostTabStoreProvider, useActiveTab } from '@/stores/postTab'
import { TAB_LABELS } from '@/utils/constants'

import { TeamChattingList } from './TeamChattingList'

const ChattingContent = () => {
  const activeTab = useActiveTab()

  const renderChattingList = () => {
    switch (activeTab) {
      case TAB_LABELS[0]:
        return <CarpoolChattingList />
      case TAB_LABELS[1]:
        return <TeamChattingList />
      default:
        return null
    }
  }

  return <MainContent>{renderChattingList()}</MainContent>
}

export const Chatting = () => {
  return (
    <PostTabStoreProvider>
      <Container>
        <MainHeader />
        <PostTabs />
        <ChattingContent />
        <BottomNavigation />
      </Container>
    </PostTabStoreProvider>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

const MainContent = styled.main`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.margin('container', 0, 'container', 0)};
  flex-grow: 1;
  overflow-y: scroll;
`
