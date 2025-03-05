import { useFetchChatSidebarInformation } from '@/entities/chat/api/useChat.query'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'

import { useSidebarActions } from '../model/sidebar.store'

export const useOpenChatSidebarWithInformation = () => {
  const boardId = useParamId()
  const { openOneButtonModal } = useModalActions()
  const { openSidebar, setSidebarInformation } = useSidebarActions()

  const { refetch } = useFetchChatSidebarInformation({ urls: { boardId } })

  const handleOpenSidebar = async () => {
    const { data, isSuccess, isError, error } = await refetch()
    if (isSuccess) {
      setSidebarInformation(data)
      openSidebar()
    }
    if (isError) return openOneButtonModal(error.message)
  }

  return handleOpenSidebar
}
