import styled from 'styled-components'

import { CheckBoxIcon } from '@/shared/ui/icons/ActiveIcons'

type Props = {
  isRecruiting: boolean
  toggleRecruiting: VoidFunction
}

export const RecruitingFilter = ({ isRecruiting, toggleRecruiting }: Props) => {
  return (
    <ToggleButton onClick={toggleRecruiting}>
      <CheckBoxIcon active={isRecruiting} />
      <ToggleText $isChecked={isRecruiting}>모집 중인 글만 보기</ToggleText>
    </ToggleButton>
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
