import { styled } from 'styled-components'

import { useToggle } from '@/shared/hook/useToggle'

type ToggleButtonProps = {
  initialToggleState?: boolean
  onClick: VoidFunction
}

export const ToggleButton = ({ initialToggleState = false, onClick }: ToggleButtonProps) => {
  const [isToggled, _] = useToggle(initialToggleState)

  const handleToggle = () => {
    onClick()
    // toggleFunction()
  }

  return (
    <Container type="button" $isToggle={isToggled} onClick={handleToggle}>
      <Circle $isToggle={isToggled} />
    </Container>
  )
}

const Container = styled.button<{ $isToggle: boolean }>`
  ${({ theme }) => theme.borderRadius('3xl')}
  position: relative;
  width: 40px;
  height: 22px;
  background-color: ${({ $isToggle, theme }) =>
    $isToggle ? theme.colors.blue[500] : theme.colors.black[300]};
  cursor: pointer;
`

const Circle = styled.div<{ $isToggle: boolean }>`
  ${({ theme }) => theme.borderRadius('full')}
  position: absolute;
  left: 4px;
  width: 16px;
  height: 16px;
  transform: ${({ $isToggle }) =>
    `translateY(-50%) ${$isToggle ? 'translateX(100%)' : 'translateX(0)'}`};

  background-color: white;
  transition: transform 0.2s ease;
`
