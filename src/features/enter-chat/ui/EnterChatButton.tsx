import { styled } from 'styled-components'

import { usePostDetail } from '@/entities/board/model/postDetail.store'
import { useUserData } from '@/features/login/model/auth.store'
import useModal from '@/shared/hook/useModal'
import { canJoinChatRoom } from '@/shared/lib/canJoinChatRoom'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { Button } from '@/shared/ui/Button'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

import { useEnterChatRoom } from '../hook/useEnterChatRoom'

export const EnterChatButton = () => {
  const post = usePostDetail()
  const user = useUserData()

  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { enterChatRoom } = useEnterChatRoom(openModal)

  if (!post) return null

  const { currentPersonnel, totalPersonnel } = post.status

  const isFull = !canJoinChatRoom(currentPersonnel, totalPersonnel)
  const isMyPost = user?.nickname === post.author.nickname

  return (
    <>
      <StyledButton
        secondary={isFull || isMyPost}
        size="sm"
        onClick={enterChatRoom}
        disabled={isFull || isMyPost}
      >
        {isFull ? '모집 마감' : '채팅하기'}
      </StyledButton>
      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.error)}
        closeModal={closeModal}
        button={{ onClickButton: closeModal }}
      />
    </>
  )
}

const StyledButton = styled(Button)`
  flex-grow: 1;
`
