import { ModalWithOneButton } from '@/components/view/modal/ButtonModal'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { useParamId } from '@/hooks/useParamId'
import { useFetchChatSidebarInformation } from '@/query/useChattingQuery'
import { useModalActions, useModalState, useSidebarState } from '@/stores/modal'

import { ChatSidebar } from './ChatSidebar'

export const ChatRoomHeader = () => {
  const boardId = useParamId()

  const isSidebarOpen = useSidebarState()
  const { isModalOpen, label } = useModalState()
  const { openSidebar, openModal, closeSidebar, closeModal } = useModalActions()

  const { data, refetch } = useFetchChatSidebarInformation({ urls: { boardId } })

  const handleClickKebab = async () => {
    const { isSuccess, isError, error } = await refetch()
    if (isSuccess) openSidebar()
    if (isError) return openModal(error.message)
  }

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={handleClickKebab} />

      <ChatSidebar sidebarInformation={data} isOpen={isSidebarOpen} onClose={closeSidebar} />
      <ModalWithOneButton
        content={label}
        isOpen={isModalOpen}
        onClose={closeModal}
        button={{ onClick: closeModal, label: '확인' }}
      />
    </>
  )
}
