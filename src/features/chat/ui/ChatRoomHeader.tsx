import { useIsSidebarOpen, useSidebarActions } from '@/features/chat/model/sidebar.store'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

import { useFetchChatSidebarInformation } from '../api/useChat.query'

import { ChatSidebar } from './ChatSidebar'

export const ChatRoomHeader = () => {
  const boardId = useParamId()

  const isSidebarOpen = useIsSidebarOpen()
  const { openOneButtonModal } = useModalActions()
  const { openSidebar, closeSidebar } = useSidebarActions()

  const { data, refetch } = useFetchChatSidebarInformation({ urls: { boardId } })

  const handleClickKebab = async () => {
    const { isSuccess, isError, error } = await refetch()
    if (isSuccess) openSidebar()
    if (isError) return openOneButtonModal(error.message)
  }

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={handleClickKebab} />

      <ChatSidebar sidebarInformation={data} isOpen={isSidebarOpen} onClose={closeSidebar} />
      <ModalWithOneButton />
    </>
  )
}
