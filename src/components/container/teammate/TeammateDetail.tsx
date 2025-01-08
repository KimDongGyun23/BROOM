import { useParams } from 'react-router-dom'

import {
  Loading,
  PostBottom,
  PostDetailContent,
  PostDetailHeader,
  PostProfile,
} from '@/components/view'
import { useTeamDetailPage } from '@/services/query'
import { useTeamDetailActions } from '@/services/service'
import type { CustomTeamDetailType } from '@/types'
import { getSessionStorageItem, SESSION_NICKNAME } from '@/utils'

const transformTeamData = (item: CustomTeamDetailType['item']) => [
  { label: '훈련 날짜', content: item.trainingDate },
  { label: '모임 정보', content: [item.meetingPlace, item.meetingTime] },
  { label: '모집 인원', content: `${item.personnel}명` },
  { label: '메모', content: item.content },
]

export const TeamDetail = () => {
  const { id } = useParams()
  if (!id) return <div>error</div>

  const teamBoardId = parseInt(id)

  const {
    data: detailData,
    isPending,
    isError,
  } = useTeamDetailPage({ urls: { teamBoardId: teamBoardId } })

  const { handleCheckFull, handleEdit, handleDelete, handleClickChatting } = useTeamDetailActions(
    teamBoardId as number,
    detailData?.item.full as boolean,
  )

  if (isPending) return <Loading />
  if (isError || !detailData) return <div>error</div>

  const isMyPost = detailData.profile.nickname === getSessionStorageItem(SESSION_NICKNAME)
  const contents = transformTeamData(detailData.item)

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
