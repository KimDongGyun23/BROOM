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
  display: flex;
  padding: ${({ theme }) => `${theme.gap.lg} ${theme.gap.xl}`};
`

const TabButton = styled.button<{ $isActive: boolean }>`
  flex-grow: 1;
  padding-bottom: ${({ theme }) => theme.gap.lg};
  border-bottom: 2px solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.black[500] : theme.colors.black[200])};
  ${({ theme, $isActive }) =>
    theme.font(700, $isActive ? theme.colors.black[600] : theme.colors.black[300])};
`
