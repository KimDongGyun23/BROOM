import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import { useIsMyPost, usePostDetail } from '@/features/board/model/postDetail.store'
import { useEnterChatRoom } from '@/features/chat/api/useChat.query'
import { useParamId } from '@/shared/hook/useParamId'
import { canJoinChatRoom } from '@/shared/lib/canJoinChatRoom'
import { ModalStoreProvider, useModalActions, useModalState } from '@/shared/model/modal.store'
import { Button } from '@/shared/ui/Button'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

const ChatButton = () => {
  const post = usePostDetail()
  const boardId = useParamId()
  const isMyPost = useIsMyPost()
  const navigate = useNavigate()

  const { openModal } = useModalActions()
  const { refetch } = useEnterChatRoom({ urls: { boardId } })

  const handleClickChatButton = async () => {
    const { isSuccess, isError, error } = await refetch()
    if (isSuccess) navigate(`/chat/${boardId}`)
    else if (isError) openModal(error.message, true)
  }

  if (!post) return null

  const { currentPersonnel, totalPersonnel } = post.status
  const isFull = !canJoinChatRoom(currentPersonnel, totalPersonnel)

  return (
    <ChatStyledButton
      secondary={isFull || isMyPost}
      size="sm"
      onClick={handleClickChatButton}
      disabled={isFull || isMyPost}
    >
      {isFull ? '모집 마감' : '채팅하기'}
    </ChatStyledButton>
  )
}

const ChatButtonModal = () => {
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{ onClick: closeModal, label: '확인' }}
    />
  )
}

export const PostChatButton = () => {
  return (
    <ModalStoreProvider>
      <ChatButton />
      <ChatButtonModal />
    </ModalStoreProvider>
  )
}

const ChatStyledButton = styled(Button)`
  flex-grow: 1;
`
