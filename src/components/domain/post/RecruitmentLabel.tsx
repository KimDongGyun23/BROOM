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
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: ${({ theme }) => theme.gap.xs};
  padding: ${({ theme }) => `${theme.gap.lg} ${theme.gap.xl}`};

  .toggle-button-text {
    font-size: ${({ theme }) => theme.fontSize[600]};
    line-height: ${({ theme }) => theme.lineHeight[600]};
    color: ${({ theme, $isChecked }) =>
      $isChecked ? theme.colors.blue[500] : theme.colors.black[400]};
  }
`
