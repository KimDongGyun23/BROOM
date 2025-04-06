import styled from 'styled-components'

import { Button } from '@/shared/ui/Button'

import { useEnterChatButtonState } from '../model/useEnterChatButtonState'
import { useEnterChatRoom } from '../model/useEnterChatRoom'

export const EnterChatButton = () => {
  const { enterChatRoom } = useEnterChatRoom()
  const { isVisible, isDisabled, label } = useEnterChatButtonState()

  if (!isVisible) return null

  return (
    <StyledButton secondary={isDisabled} size="sm" onClick={enterChatRoom} disabled={isDisabled}>
      {label}
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  flex-grow: 1;
`
