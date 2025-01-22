import styled from 'styled-components'

import { CheckBoxIcon } from '@/components/view/icons/ActiveIcons'
import { useToggle } from '@/hooks/useToggle'

type RecruitmentLabelProps = {
  onClick: VoidFunction
}

export const RecruitmentLabel = ({ onClick }: RecruitmentLabelProps) => {
  const [isChecked, toggleIsChecked] = useToggle()

  const handleClick = () => {
    onClick()
    toggleIsChecked()
  }

  return (
    <Container>
      <ToggleButton type="button" $isChecked={isChecked} onClick={handleClick}>
        <CheckBoxIcon active={isChecked} />
        <p className="toggle-button-text">모집 중인 글만 보기</p>
      </ToggleButton>
    </Container>
  )
}

const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[200]};
`

const ToggleButton = styled.button<{ $isChecked: boolean }>`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')}
  ${({ theme }) => theme.margin(0, 0, 0, 'auto')};
  ${({ theme }) => theme.padding('md', 'lg', 'md', 'lg')};

  .toggle-button-text {
    ${({ theme, $isChecked }) =>
      theme.font(600, $isChecked ? theme.colors.blue[500] : theme.colors.black[400])};
  }
`
