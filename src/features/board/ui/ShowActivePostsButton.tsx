import styled from 'styled-components'

import {
  useActiveOnlyFilterActions,
  useIsFilteringActiveOnly,
} from '@/features/board/model/activeOnlyFilter.store'
import { CheckBoxIcon } from '@/shared/ui/icons/ActiveIcons'

export const ShowActivePostsButton = () => {
  const isFilteringActiveOnly = useIsFilteringActiveOnly()
  const { toggleFilterActiveOnly } = useActiveOnlyFilterActions()

  return (
    <div>
      <ToggleButton onClick={toggleFilterActiveOnly}>
        <CheckBoxIcon active={isFilteringActiveOnly} />
        <ToggleText $isChecked={isFilteringActiveOnly}>모집 중인 글만 보기</ToggleText>
      </ToggleButton>
    </div>
  )
}

const ToggleButton = styled.button`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', undefined, 'xs')}
    ${theme.margin(0, 0, 0, 'auto')}
  `}
`

const ToggleText = styled.p<{ $isChecked: boolean }>`
  ${({ theme, $isChecked }) =>
    theme.font(900, $isChecked ? theme.colors.blue[500] : theme.colors.black[300])};
`
