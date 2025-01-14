import { useParams } from 'react-router-dom'

import { PostBottom } from '@/components/domain/post/PostBottom'
import { PostDetailContent } from '@/components/domain/post/PostDetailContent'
import { PostDetailHeader } from '@/components/domain/post/PostDetailHeader'
import { Loading } from '@/components/view/Loading'
import { PostProfile } from '@/components/view/Profile'
import { useTeamDetailPage } from '@/services/query/useTeamQuery'
import { useTeamDetailActions } from '@/services/service/useTeamDetailActions'
import type { CustomPostDetailType } from '@/types/post'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

import { ErrorPage } from '../home/ErrorPage'

// const dummy = {
//   profile: {
//     userId: '1',
//     nickname: '고로케',
//     dischargeYear: 4,
//     militaryChaplain: 'ARMY' as MilitaryBranchCode,
//     createdAt: '2024/04/12 12:33',
//   },
//   item: {
//     id: 1,
//     title: '조기퇴소 가즈아',
//     createdAt: '2024/04/12 12:33',
//     trainingDate: '2024-05-21',
//     place: '금곡역',
//     time: '08:30',
//     personnel: 8,
//     full: false,
//     content:
//       '빠르게 조기퇴소 하실 분들 구해여. 현재 3년차 이상 두명 있습니다. 같이 하실 분들 연락주세요.',
//   },
// }

const transformTeamData = (item: CustomPostDetailType['item']) => [
  { label: '훈련 날짜', content: item.trainingDate },
  { label: '모임 정보', content: [item.place, item.time] },
  { label: '모집 인원', content: `${item.personnel}명` },
  { label: '메모', content: item.content },
]

export const TeamDetail = () => {
  const { id } = useParams()
  if (!id) return <ErrorPage />

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
  // const { handleCheckFull, handleEdit, handleDelete, handleClickChatting } = useTeamDetailActions(
  //   teamBoardId as number,
  //   dummy?.item.full || false,
  // )

  if (isPending) return <Loading />
  if (isError || !detailData) return <ErrorPage />

  const { profile, item } = detailData
  // const { profile, item } = dummy

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
          onBookmark={() => {}}
          onChatStart={handleClickChatting}
        />
      </div>
    </>
  )
}
