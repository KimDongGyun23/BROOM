import styled from 'styled-components'

type DotIndicatorProps = {
  currentTab: number
  onDotClick: (index: number) => void
}

export const DotIndicator = ({ currentTab, onDotClick }: DotIndicatorProps) => {
  return (
    <Container>
      {[...Array(3)].map((_, index) => (
        <DotButton key={index} $isActive={index === currentTab} onClick={() => onDotClick(index)} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', undefined, undefined, 'sm')}
    ${theme.margin('xl', 0, 0)}
  `}
`

const DotButton = styled.button<{ $isActive: boolean }>`
  ${({ theme, $isActive }) => `
    ${theme.borderRadius($isActive ? 'md' : 'full')}
    width: ${$isActive ? '24px' : '8px'};
    opacity: ${$isActive ? '0.9' : '0.5'};
    background-color: ${$isActive ? theme.colors.black[600] : theme.colors.black[200]};
  `}
  height: 8px;
`
