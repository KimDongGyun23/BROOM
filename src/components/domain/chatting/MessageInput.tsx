import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { SendingIcon } from '@/components/view/icons/NonActiveIcons'
import { useWebSocket } from '@/hooks/useWebsocket'

export const MessageInput = () => {
  const formMethod = useForm<{ message: string }>({ defaultValues: { message: '' } })
  const { register, handleSubmit, reset } = formMethod
  const { client, sendMessage } = useWebSocket()

  const handleSendMessage = ({ message }: { message: string }) => {
    console.log('message 보내기. connected: ', client.current?.connected)
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
        <MessageBoxForm onSubmit={handleSubmit(handleSendMessage)}>
          <Input
            type="text"
            size={8}
            {...register('message')}
            placeholder="메세지를 입력해주세요."
          />

          <SendingButton type="submit">
            <SendingIcon />
          </SendingButton>
        </MessageBoxForm>
      </Container>
    </FormProvider>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.padding('sm', 'lg', '4xl')};
`

const MessageBoxForm = styled.form`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  ${({ theme }) => theme.borderRadius('xl')};
  ${({ theme }) => theme.padding('messageInput')};
  flex-grow: 1;
  max-height: 40px;
  background-color: ${({ theme }) => theme.colors.black[100]};
`

const SendingButton = styled.button`
  flex-shrink: 0;
`

const Input = styled.input`
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
