import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import { useIsMyPost, usePostDetail } from '@/features/board/model/postDetail.store'
import { useEnterChatRoom } from '@/query/useChattingQuery'
import { useParamId } from '@/shared/hook/useParamId'
import { Button } from '@/shared/ui/Button'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { ModalStoreProvider, useModalActions, useModalState } from '@/stores/modal'
import { canJoinChatRoom } from '@/utils/canJoinChatRoom'

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
