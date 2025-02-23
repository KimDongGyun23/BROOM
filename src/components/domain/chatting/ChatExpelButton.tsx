import { styled } from 'styled-components'

import { useExpelUser } from '@/query/useChattingQuery'
import { useParamId } from '@/shared/hook/useParamId'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { ModalStoreProvider, useModalActions, useModalState } from '@/stores/modal'
import { useSidebarActions } from '@/stores/\bsidebar'

type ChatExpelButtonProps = {
  userId: string
}

const ExpelButton = ({ userId }: ChatExpelButtonProps) => {
  const boardId = useParamId()

  const { openModal } = useModalActions()

  const { mutate: expelUser } = useExpelUser()

  const handleClickExpelButton = () => {
    expelUser(
      { body: { expellId: userId, boardId } },
      {
        onSuccess: (response) => openModal(response, true),
        onError: (error) => openModal(error.message, false),
      },
    )
  }

  return <StyledButton onClick={handleClickExpelButton}>내보내기</StyledButton>
}

const ExpelModal = () => {
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()
  const { closeSidebar } = useSidebarActions()

  const handleCloseModal = () => {
    closeModal()
    closeSidebar()
  }

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      content={label}
      onClose={closeModal}
      button={{ onClick: handleCloseModal, label: '확인' }}
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
