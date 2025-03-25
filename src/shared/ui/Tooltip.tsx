import styled from 'styled-components'

import { useToggle } from '../hook/useToggle'

import { InfoIcon } from './icons/NonActiveIcons'

type TooltipProps = {
  message: string
}

export const Tooltip = ({ message }: TooltipProps) => {
  const [isTooltipOpen, toggleTooltipOpen] = useToggle()

  return (
    <Container>
      <TooltipButton onClick={toggleTooltipOpen}>
        <InfoIcon />
      </TooltipButton>

      {isTooltipOpen && <TooltipMessage>{message}</TooltipMessage>}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const TooltipButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')}
`

const TooltipMessage = styled.div`
  ${({ theme }) => `
    ${theme.padding('sm', 'md')}
    ${theme.boxShadow('sm')}
    ${theme.border('divider')}
    ${theme.borderRadius('sm')}
    ${theme.font(900, theme.colors.black[400])}
  `}

  width: 180px;
  background-color: white;
  position: absolute;
  white-space: pre-wrap;
  bottom: 0;
  transform: translateY(100%);
  z-index: 10;
`
