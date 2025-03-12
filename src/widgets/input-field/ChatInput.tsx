import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { useWebSocket } from '@/entities/chat/hook/useWebsocket'
import type { ChatMessage } from '@/shared/model/common.type'
import { SendingIcon } from '@/shared/ui/icons/NonActiveIcons'

export const ChatInput = () => {
  const formMethod = useForm<ChatMessage>({ defaultValues: { message: '' } })

  const { reset, register, handleSubmit } = formMethod
  const { client, sendMessage } = useWebSocket()

  const handleSendMessage = ({ message }: ChatMessage) => {
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
      <Container>
        <ChatInputForm onSubmit={handleSubmit(handleSendMessage)}>
          <ChatInputField
            type="text"
            size={8}
            {...register('message')}
            placeholder="메세지를 입력해주세요."
          />

          <SendMessageButton type="submit">
            <SendingIcon />
          </SendMessageButton>
        </ChatInputForm>
      </Container>
    </FormProvider>
  )
}

const Container = styled.div`
  ${({ theme }) => `
    ${theme.padding('sm', 'lg', 'xl')}
    ${theme.boxShadow('md')}
  `}
`

const ChatInputForm = styled.form`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', undefined, 'xs')}
    ${theme.borderRadius('xl')}
    ${theme.padding('messageInput')}
  `}
  flex-grow: 1;
  max-height: 40px;
  background-color: ${({ theme }) => theme.colors.black[100]};
`

const SendMessageButton = styled.button`
  flex-shrink: 0;
`

const ChatInputField = styled.input`
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
  flex-grow: 1;
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.black[300]};
  }

  &:focus {
    outline: none;
  }
`
