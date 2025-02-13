import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import { Button } from '@/components/view/Button'
import { BookmarkIcon } from '@/components/view/icons/ActiveIcons'
import { useParamId } from '@/hooks/useParamId'
import { useToggle } from '@/hooks/useToggle'
import { instance } from '@/query'
import { useCarpoolChattingId } from '@/query/useChattingQuery'
import { useDeleteBookmark, useSetBookmark } from '@/query/usePostQuery'
import { usePostDetail, usePostDetailActions } from '@/stores/post'
import { canJoinChatRoom } from '@/utils/canJoinChatRoom'

const useHandleBookmark = () => {
  const boardId = useParamId()
  const post = usePostDetail()

  const { setPostDetail } = usePostDetailActions()
  const { mutate: setBookmark } = useSetBookmark()
  const { mutate: deleteBookmark } = useDeleteBookmark()

  const handleBookmark = () => {
    if (post && post.status.bookmark) {
      deleteBookmark(
        { urls: { boardId } },
        {
          onSuccess: () => setPostDetail({ ...post, status: { ...post.status, bookmark: false } }),
        },
      )
    } else if (post && !post.status.bookmark) {
      setBookmark(
        { body: { boardId } },
        { onSuccess: () => setPostDetail({ ...post, status: { ...post.status, bookmark: true } }) },
      )
    }
  }
  return handleBookmark
}

const useHandleChatting = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { mutate: chattingMutation } = useCarpoolChattingId()

  const handleClickChatting = () => {
    chattingMutation(
      { urls: { carpoolBoardId: boardId.toString() } },
      {
        onSuccess: ({ chatRoomId }) => navigate(`/chatting/chatting-room/carpool/${chatRoomId}`),
      },
    )
  }

  return handleClickChatting
}

const ChattingButton = ({ isFull }: { isFull: boolean }) => {
  const handleClickChatting = useHandleChatting()

  return (
    <ChattingStyledButton
      secondary={isFull}
      size="sm"
      onClick={handleClickChatting}
      disabled={isFull}
    >
      {isFull ? '모집 마감' : '채팅하기'}
    </ChattingStyledButton>
  )
}

const BookmarkButton = ({ initialBookmark }: { initialBookmark: boolean }) => {
  const handleBookmark = useHandleBookmark()
  const [isBookmarked, setIsBookmarked] = useToggle(initialBookmark)

  const handleClickBookmark = () => {
    handleBookmark()
    setIsBookmarked()
  }

  return (
    <BookmarkStyledButton type="button" onClick={handleClickBookmark}>
      <BookmarkIcon active={isBookmarked} />
      <p className="label">북마크</p>
    </BookmarkStyledButton>
  )
}

export const PostDetailFooter = () => {
  const post = usePostDetail()
  const session = instance.hasToken()

  if (!post || !post.status || !session) return null

  return (
    <Container>
      <BookmarkButton initialBookmark={post.status.bookmark} />
      <ChattingButton
        isFull={!canJoinChatRoom(post.status.currentPersonnel, post.status.totalPersonnel)}
      />
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xl')};
  ${({ theme }) => theme.boxShadow('md')};
  ${({ theme }) => theme.padding('sm', 'lg', 'xl')};
  width: 100%;
`

const BookmarkStyledButton = styled.button`
  ${({ theme }) => theme.flexBox('column', 'center', undefined, 'xs')}
  flex-shrink: 0;

  .label {
    ${({ theme }) => theme.font(900, theme.colors.black[400])};
  }
`

const ChattingStyledButton = styled(Button)`
  flex-grow: 1;
`
