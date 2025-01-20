import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { AdditionIcon, SendingIcon } from '@/components/view/icons/NonActiveIcons'
import { useWebSocket } from '@/hooks/useWebsocket'
import type { TabKey } from '@/utils/constants'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

export const MessageBox = () => {
  const { id: roomId } = useParams()
  const currentTab = getSessionStorageItem(SESSION_KEYS.POST_TAB) as TabKey

  const formMethod = useForm<{ message: string }>({ defaultValues: { message: '' } })
  const { register, handleSubmit, reset } = formMethod
  const { client, sendMessage } = useWebSocket(roomId, currentTab)

  const handleSendMessage = ({ message }: { message: string }) => {
    if (message.length !== 0) {
      if (client.current && client.current.connected) {
        sendMessage(message)
        reset()
      } else {
        console.log('WebSocket is not connected')
      }
    }
  }

  return (
    <FormProvider {...formMethod}>
      <MessageBoxForm onSubmit={handleSubmit(handleSendMessage)}>
        <AdditionIcon />
        <MessageInputContainer>
          <MessageInput type="text" size={8} {...register} placeholder="메세지를 입력해주세요." />

          <button type="submit" className="message-button">
            <SendingIcon />
          </button>
        </MessageInputContainer>
      </MessageBoxForm>
    </FormProvider>
  )
}

const MessageBoxForm = styled.form`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.gap.md};
  background-color: white;
  padding: ${({ theme }) => `${theme.gap.lg} ${theme.gap.xl}`} 32px;
`

const MessageInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: ${({ theme }) => theme.gap.xs};
  background-color: ${({ theme }) => theme.colors.black[100]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => `${theme.gap.md} ${theme.gap.md} ${theme.gap.md} ${theme.gap.xl}`};

  .message-button {
    flex-shrink: 0;
  }
`

const MessageInput = styled.input`
  flex-grow: 1;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize[800]};
  line-height: ${({ theme }) => theme.lineHeight[800]};
  color: ${({ theme }) => theme.colors.black[500]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.black[300]};
  }

  &:focus {
    outline: none;
  }
`
