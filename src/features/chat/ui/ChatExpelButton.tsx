import { styled } from 'styled-components'

import { useSidebarActions } from '@/features/chat/model/sidebar.store'
import { useParamId } from '@/shared/hook/useParamId'
import { ModalStoreProvider, useModalActions } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

import { useExpelUser } from '../api/useChat.mutation'

type ChatExpelButtonProps = {
  userId: string
}

const ExpelButton = ({ userId }: ChatExpelButtonProps) => {
  const boardId = useParamId()

  const { openOneButtonModal } = useModalActions()

  const { mutate: expelUser } = useExpelUser()

  const handleClickExpelButton = () => {
    expelUser(
      { body: { expellId: userId, boardId } },
      {
        onSuccess: (response) => openOneButtonModal(response, true),
        onError: (error) => openOneButtonModal(error.message, false),
      },
    )
  }

  return <StyledButton onClick={handleClickExpelButton}>내보내기</StyledButton>
}

const ExpelModal = () => {
  const { closeSidebar } = useSidebarActions()

  return <ModalWithOneButton onClickButton={closeSidebar} />
}

export const ChatExpelButton = ({ userId }: ChatExpelButtonProps) => (
  <ModalStoreProvider>
    <ExpelButton userId={userId} />
    <ExpelModal />
  </ModalStoreProvider>
)

const StyledButton = styled.button`
  ${({ theme }) => theme.padding('xs', 'sm')};
  ${({ theme }) => theme.font(900, theme.colors.orange)};
  ${({ theme }) => theme.borderRadius('md')};
  background-color: ${({ theme }) => theme.colors.black[100]};
`
