import styled from 'styled-components'

import { CheckBoxIcon } from '@/components/view/icons/ActiveIcons'

type ActiveToggleProps = {
  isChecked: boolean
  onToggle: VoidFunction
}

export const PostActiveToggle = ({ isChecked, onToggle }: ActiveToggleProps) => (
  <Container>
    <ToggleButton onClick={onToggle}>
      <CheckBoxIcon active={isChecked} />
      <ToggleText $isChecked={isChecked}>모집 중인 글만 보기</ToggleText>
    </ToggleButton>
  </Container>
)

const Container = styled.div`
  ${({ theme }) => theme.margin(0, 'container', 0, 'container')};
  ${({ theme }) => theme.padding('sm', 0, 'sm', 0)};
  ${({ theme }) => theme.border(0, 0, 'divider', 0)};
`

const ToggleButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  ${({ theme }) => theme.margin(0, 0, 0, 'auto')};
`

const ToggleText = styled.p<{ $isChecked: boolean }>`
  ${({ theme, $isChecked }) =>
    theme.font(900, $isChecked ? theme.colors.blue[500] : theme.colors.black[300])};
`
