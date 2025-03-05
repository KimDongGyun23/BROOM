import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { SendingIcon } from '@/shared/ui/icons/NonActiveIcons'

import { useSendMessage } from '../hook/useSendMessage'

export const MessageInput = () => {
  const formMethod = useForm<{ message: string }>({ defaultValues: { message: '' } })

  const { onSubmit } = useSendMessage()

  const { register } = formMethod

  return (
    <FormProvider {...formMethod}>
      <Container>
        <MessageBoxForm onSubmit={onSubmit}>
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
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', undefined, 'xs')}
    ${theme.borderRadius('xl')}
    ${theme.padding('messageInput')}
  `}
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
