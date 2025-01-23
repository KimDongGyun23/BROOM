import styled from 'styled-components'

import { useActiveTab, usePostTabActions } from '@/stores/postTab'
import { TAB_LABELS } from '@/utils/constants'

export const PostTabs = () => {
  const activeTab = useActiveTab()
  const { setActiveTab } = usePostTabActions()

  return (
    <Container>
      {TAB_LABELS.map((tab) => (
        <TabButton
          key={tab}
          $isActive={activeTab === tab}
          onClick={() => setActiveTab(tab)}
          aria-selected={activeTab === tab}
          role="tab"
        >
          <li>{tab}</li>
        </TabButton>
      ))}
    </Container>
  )
}

const Container = styled.ul`
  ${({ theme }) => theme.padding('md', 'lg')};
  display: flex;
`

const TabButton = styled.button<{ $isActive: boolean }>`
  ${({ theme }) => theme.padding(0, 0, 'md')};
  ${({ theme, $isActive }) => theme.border($isActive ? 'tab-active' : 'tab-nonactive', 'bottom')};
  ${({ theme, $isActive }) =>
    theme.font(700, $isActive ? theme.colors.black[600] : theme.colors.black[300])};
  flex-grow: 1;
`
