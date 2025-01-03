import { useParams } from 'react-router-dom'

import {
  Loading,
  PostBottom,
  PostDetailContent,
  PostDetailHeader,
  PostProfile,
} from '@/components/view'
import { useTeammateDetailPage } from '@/services/query'
import { useTeammateDetailActions } from '@/services/service'
import type { CustomTeammateDetailType } from '@/types'
import { getSessionStorageItem, SESSION_NICKNAME } from '@/utils'

const transformTeammateData = (item: CustomTeammateDetailType['item']) => [
  { label: '훈련 날짜', content: item.trainingDate },
  { label: '모임 정보', content: [item.meetingPlace, item.meetingTime] },
  { label: '모집 인원', content: `${item.personnel}명` },
  { label: '메모', content: item.content },
]

export const TeammateDetail = () => {
  const { id } = useParams()
  if (!id) return <div>error</div>

  const teammateBoardId = parseInt(id)

  const {
    data: detailData,
    isPending,
    isError,
  } = useTeammateDetailPage({ urls: { teamBoardId: teammateBoardId } })

  const { handleCheckFull, handleEdit, handleDelete, handleClickChatting } =
    useTeammateDetailActions(teammateBoardId as number, detailData?.item.full as boolean)

  if (isPending) return <Loading />
  if (isError || !detailData) return <div>error</div>

  const isMyPost = detailData.profile.nickname === getSessionStorageItem(SESSION_NICKNAME)
  const contents = transformTeammateData(detailData.item)

  return (
    <>
      <div className="flex-column h-full">
        <PostDetailHeader
          isMyPost={isMyPost}
          isFull={detailData.item.full}
          onCheckFull={handleCheckFull}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <PostProfile profile={detailData.profile} />
        <PostDetailContent title={detailData.item.title} contents={contents} />
        <PostBottom
          isMyPost={isMyPost}
          disabled={detailData.item.full}
          onClickBookmark={() => {}}
          onClickChattingButton={handleClickChatting}
        />
      </div>
    </>
  )
}
