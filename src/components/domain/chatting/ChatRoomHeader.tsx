import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'
import { useParamId } from '@/hooks/useParamId'
import { useFetchChatSidebarInformation } from '@/query/useChattingQuery'
import { useModalActions, useModalState } from '@/stores/modal'
import { useIsSidebarOpen, useSidebarActions } from '@/stores/\bsidebar'

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
