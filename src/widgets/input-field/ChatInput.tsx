import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { useWebSocket } from '@/entities/chat/hook/useWebsocket'
import { MODAL_KEYS } from '@/shared/lib/constants'
import type { ChatMessage } from '@/shared/model/common.type'
import { SendingIcon } from '@/shared/ui/icons/NonActiveIcons'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const ChatInput = () => {
  const formMethod = useForm<ChatMessage>({ defaultValues: { message: '' } })

  const { reset, register, handleSubmit } = formMethod

  const { sendMessage, modalLabel, isModalOpen, closeMoveToPrevModal, closeErrorModal } =
    useWebSocket()

  const handleSendMessage = ({ message }: ChatMessage) => sendMessage(message, reset)

  return (
    <>
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

      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.error)}
        closeModal={closeErrorModal}
        button={{ onClickButton: closeErrorModal }}
      />

      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.confirm)}
        isModalOpen={isModalOpen(MODAL_KEYS.confirm)}
        closeModal={closeMoveToPrevModal}
        button={{ onClickButton: closeMoveToPrevModal }}
      />
    </>
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
