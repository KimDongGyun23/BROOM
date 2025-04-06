import { useFetchChatSidebarInformation } from '@/entities/chat/api/useChat.query'
import { useParamId } from '@/shared/hook/useParamId'

import { useSidebarActions } from './sidebar.store'

export const useOpenChatSidebar = () => {
  const boardId = useParamId()

  const { openSidebar, setSidebarInformation } = useSidebarActions()

  const { refetch } = useFetchChatSidebarInformation({ urls: { boardId } })

  const handleOpenSidebar = async () => {
    const { data, isSuccess } = await refetch()
    if (isSuccess) {
      setSidebarInformation(data)
      openSidebar()
    }
  }

  return { handleOpenSidebar }
}
