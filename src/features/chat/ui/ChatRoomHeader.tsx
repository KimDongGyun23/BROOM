import { useIsSidebarOpen, useSidebarActions } from '@/features/chat/model/sidebar.store'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions, useModalState } from '@/shared/model/modal'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

import { useFetchChatSidebarInformation } from '../api/useChat.query'

import { ChatSidebar } from './ChatSidebar'

export const ChatRoomHeader = () => {
  const boardId = useParamId()

  const isSidebarOpen = useIsSidebarOpen()
  const { isModalOpen, label } = useModalState()
  const { openModal, closeModal } = useModalActions()
  const { openSidebar, closeSidebar } = useSidebarActions()

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
