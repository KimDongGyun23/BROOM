import styled from 'styled-components'

import { CheckBoxIcon } from '@/components/view/icons/ActiveIcons'
import { useActiveOnlyFilterActions, useIsFilteringActiveOnly } from '@/stores/\bactiveOnlyFilter'

export const PostActiveToggle = () => {
  const isFilteringActiveOnly = useIsFilteringActiveOnly()
  const { toggleFilterActiveOnly } = useActiveOnlyFilterActions()

  return (
    <Container>
      <ToggleButton onClick={toggleFilterActiveOnly}>
        <CheckBoxIcon active={isFilteringActiveOnly} />
        <ToggleText $isChecked={isFilteringActiveOnly}>모집 중인 글만 보기</ToggleText>
      </ToggleButton>
    </Container>
  )
}
const Container = styled.div`
  ${({ theme }) => theme.margin(0, 'container')};
  ${({ theme }) => theme.padding('sm', 0)};
  ${({ theme }) => theme.border('divider', 'bottom')};
`

const ToggleButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  ${({ theme }) => theme.margin(0, 0, 0, 'auto')};
`

const ToggleText = styled.p<{ $isChecked: boolean }>`
  ${({ theme, $isChecked }) =>
    theme.font(900, $isChecked ? theme.colors.blue[500] : theme.colors.black[300])};
`
