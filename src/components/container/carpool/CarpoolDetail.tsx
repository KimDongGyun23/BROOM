import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { CarpoolDetailHeader } from '@/components/domain/carpool/CarpoolDetailHeader'
import { PostBottom } from '@/components/domain/post/PostBottom'
import { PostDetailContent } from '@/components/domain/post/PostDetailContent'
import { Loading } from '@/components/view/Loading'
import { PostProfile } from '@/components/view/Profile'
import { useParamId } from '@/hooks/useParamId'
import { useCarpoolChattingId } from '@/services/query/useChattingQuery'
import { useCarpoolInitialize } from '@/services/service/useCarpoolInitialize'
import { TAB_KEYS } from '@/utils/constants'
import { SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

import { ErrorPage } from '../home/ErrorPage'

type HeaderProps = {
  isMyPost: boolean
  isFull: boolean
}

const Bottom = ({ isMyPost, isFull }: HeaderProps) => {
  const boardId = useParamId()
  const navigate = useNavigate()
  const { mutate: chattingMutation } = useCarpoolChattingId()

  const handleClickChatting = () => {
    chattingMutation(
      { urls: { carpoolBoardId: boardId.toString() } },
      {
        onSuccess: ({ chatRoomId }) => {
          setSessionStorageItem(SESSION_KEYS.ROOM_TYPE, TAB_KEYS[0])
          navigate(`/chatting/chatting-room/carpool/${chatRoomId}`)
        },
      },
    )
  }

  return (
    <PostBottom
      isMyPost={isMyPost}
      disabled={isFull}
      onBookmark={() => {}}
      onChatStart={handleClickChatting}
    />
  )
}

export const CarpoolDetail = () => {
  const { carpoolDetail, isPending, isError } = useCarpoolInitialize()

  if (isPending) return <Loading />
  if (isError || !carpoolDetail) return <ErrorPage />

  return (
    <Container>
      <CarpoolDetailHeader />
      <PostProfile profile={profile} />
      <PostDetailContent contents={item} />
      <Bottom isMyPost={isMyPost} isFull={item.full} />
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`
