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
  margin: 0 ${({ theme }) => theme.gap.xl};
  padding: ${({ theme }) => theme.gap.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[200]};
`

const ToggleButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.xs)};
  margin-left: auto;
`

const ToggleText = styled.p<{ $isChecked: boolean }>`
  ${({ theme, $isChecked }) =>
    theme.font(900, $isChecked ? theme.colors.blue[500] : theme.colors.black[300])};
`
