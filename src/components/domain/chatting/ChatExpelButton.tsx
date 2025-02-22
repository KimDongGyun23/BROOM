import { styled } from 'styled-components'

import { ModalWithOneButton } from '@/components/view/modal/ButtonModal'
import { useParamId } from '@/hooks/useParamId'
import { useExpelUser, useFetchChatSidebarInformation } from '@/query/useChattingQuery'
import { ModalStoreProvider, useModalActions, useModalState } from '@/stores/modal'

type ChatExpelButtonProps = {
  userId: string
}

const ExpelButton = ({ userId }: ChatExpelButtonProps) => {
  const boardId = useParamId()

  const { mutate: expelUser } = useExpelUser()
  const { refetch } = useFetchChatSidebarInformation({ urls: { boardId } })

  const { openModal } = useModalActions()

  const handleClickExpelButton = () => {
    expelUser(
      { body: { expellId: userId, boardId } },
      {
        onSuccess: (response) => {
          // refetch 에러처리 필요
          refetch()
          openModal(response)
        },
        onError: (error) => openModal(error.message),
      },
    )
  }

  return <StyledButton onClick={handleClickExpelButton}>내보내기</StyledButton>
}

const ExpelModal = () => {
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      content={label}
      onClose={closeModal}
      button={{ onClick: closeModal, label: '확인' }}
    />
  )
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
