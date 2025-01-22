import styled from 'styled-components'

import type { TabLabel } from '@/utils/constants'
import { TAB_LABELS } from '@/utils/constants'
import { SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

type PostTabsProps = {
  currentTab: TabLabel
  onTabClick: (tab: TabLabel) => void
}

export const PostTabs = ({ currentTab, onTabClick }: PostTabsProps) => {
  const handleTabClick = (tab: TabLabel) => {
    onTabClick(tab)
    setSessionStorageItem(SESSION_KEYS.POST_TAB, tab)
  }

  return (
    <Container>
      {TAB_LABELS.map((tab) => (
        <li key={tab}>
          <TabButton
            $isActive={currentTab === tab}
            onClick={() => handleTabClick(tab)}
            aria-selected={currentTab === tab}
            role="tab"
          >
            {tab}
          </TabButton>
        </li>
      ))}
    </Container>
  )
}

const Container = styled.ul`
  ${({ theme }) => theme.padding('md', 'lg', 'md', 'lg')};
  display: flex;
`

const TabButton = styled.button<{ $isActive: boolean }>`
  ${({ theme }) => theme.padding(0, 0, 'md', 0)};
  ${({ theme, $isActive }) => theme.border(0, 0, $isActive ? 'tab-active' : 'tab-nonactive', 0)};
  ${({ theme, $isActive }) =>
    theme.font(700, $isActive ? theme.colors.black[600] : theme.colors.black[300])};
  flex-grow: 1;
`
