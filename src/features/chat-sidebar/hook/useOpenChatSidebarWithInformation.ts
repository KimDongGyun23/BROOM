import { useFetchChatSidebarInformation } from '@/entities/chat/api/useChat.query'
import type { OpenModal } from '@/shared/hook/useModal'
import { useParamId } from '@/shared/hook/useParamId'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useSidebarActions } from '../model/sidebar.store'

export const useOpenChatSidebarWithInformation = (openModal: OpenModal) => {
  const boardId = useParamId()

  const { openSidebar, setSidebarInformation } = useSidebarActions()

  const { refetch } = useFetchChatSidebarInformation({ urls: { boardId } })

  const handleOpenSidebar = async () => {
    const { data, isSuccess, isError, error } = await refetch()
    if (isSuccess) {
      setSidebarInformation(data)
      openSidebar()
    }
    if (isError) return openModal(MODAL_KEYS.error, error.message)
  }

  return handleOpenSidebar
}
