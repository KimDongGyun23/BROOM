import styled from 'styled-components'

import type { TabLabel } from '@/utils/constants'
import { TAB_LABELS } from '@/utils/constants'

type PostTabsProps = {
  currentTab: TabLabel
  onTabClick: (tab: TabLabel) => void
}

export const PostTabs = ({ currentTab, onTabClick }: PostTabsProps) => {
  return (
    <Container>
      {TAB_LABELS.map((tab) => (
        <li key={tab}>
          <TabButton $isActive={currentTab === tab} onClick={() => onTabClick(tab)}>
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
  font-size: ${({ theme }) => theme.fontSize[700]};
  line-height: ${({ theme }) => theme.lineHeight[700]};
`

const TabButton = styled.button<{ $isActive: boolean }>`
  flex-grow: 1;
  padding-bottom: ${({ theme }) => theme.gap.lg};
  border-bottom: 2px solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.black[500] : theme.colors.black[200])};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.black[600] : theme.colors.black[300]};
`
