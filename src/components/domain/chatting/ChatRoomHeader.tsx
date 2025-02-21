import { ModalWithOneButton } from '@/components/view/modal/ButtonModal'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { useParamId } from '@/hooks/useParamId'
import { useFetchChatSidebarInformation } from '@/query/useChattingQuery'
import { useIsSuccessModal, useModalActions, useModalState } from '@/stores/modal'

import { ChatSidebar } from './ChatSidebar'

export const ChatRoomHeader = () => {
  const boardId = useParamId()

  const isSuccessModal = useIsSuccessModal()
  const { isModalOpen, label } = useModalState()
  const { openModal, closeModal } = useModalActions()

  const { data, refetch } = useFetchChatSidebarInformation({ urls: { boardId } })

  const handleClickKebab = async () => {
    const { isSuccess, isError, error } = await refetch()
    if (isSuccess) openModal('사이드바가 열렸습니다.', true)
    if (isError) return openModal(error.message, false)
  }

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={handleClickKebab} />
      {isModalOpen &&
        (isSuccessModal ? (
          <ChatSidebar sidebarInformation={data} isOpen={isModalOpen} onClose={closeModal} />
        ) : (
          <ModalWithOneButton
            content={label}
            isOpen={isModalOpen}
            onClose={closeModal}
            button={{ onClick: closeModal, label: '확인' }}
          />
        ))}
    </>
  )
}
