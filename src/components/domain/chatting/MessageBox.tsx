import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { AdditionIcon, SendingIcon } from '@/components/view/icons/NonActiveIcons'
import { useWebSocket } from '@/hooks/useWebsocket'

export const MessageBox = () => {
  const { id: roomId } = useParams()

  const formMethod = useForm<{ message: string }>({ defaultValues: { message: '' } })
  const { register, handleSubmit, reset } = formMethod
  const { client, sendMessage } = useWebSocket(roomId)

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
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')};
  ${({ theme }) => theme.padding('md', 'lg', 'xxl', 'lg')};
  background-color: white;
`

const MessageInputContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  ${({ theme }) => theme.borderRadius('full')};
  ${({ theme }) => theme.padding('sm', 'sm', 'sm', 'lg')};
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.black[100]};

  .message-button {
    flex-shrink: 0;
  }
`

const MessageInput = styled.input`
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
