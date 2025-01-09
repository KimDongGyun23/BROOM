import { useParams } from 'react-router-dom'

import { PostBottom } from '@/components/domain/post/PostBottom'
import { PostDetailContent } from '@/components/domain/post/PostDetailContent'
import { PostDetailHeader } from '@/components/domain/post/PostDetailHeader'
import { Loading } from '@/components/view/Loading'
import { PostProfile } from '@/components/view/Profile'
import { useTeamDetailPage } from '@/services/query/useTeamQuery'
import { useTeamDetailActions } from '@/services/service/useTeammateDetailActions'
import type { CustomPostDetailType } from '@/types/post'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

const transformTeamData = (item: CustomPostDetailType['item']) => [
  { label: '훈련 날짜', content: item.trainingDate },
  { label: '모임 정보', content: [item.place, item.time] },
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
    detailData?.item.full || false,
  )

  if (isPending) return <Loading />
  if (isError || !detailData) return <div>error</div>

  const { profile, item } = detailData

  const isMyPost = profile.nickname === getSessionStorageItem(SESSION_KEYS.NICKNAME)
  const contents = transformTeamData(item)

  return (
    <>
      <div className="flex-column h-full">
        <PostDetailHeader
          isMyPost={isMyPost}
          isFull={item.full}
          onCheckFull={handleCheckFull}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <PostProfile profile={profile} />
        <PostDetailContent title={item.title} contents={contents} />
        <PostBottom
          isMyPost={isMyPost}
          disabled={item.full}
          onClickBookmark={() => {}}
          onClickChattingButton={handleClickChatting}
        />
      </div>
    </>
  )
}