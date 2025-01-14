import { useParams } from 'react-router-dom'

import { ErrorPage } from '@/components/container/home/ErrorPage'
import { PostBottom } from '@/components/domain/post/PostBottom'
import { PostDetailContent } from '@/components/domain/post/PostDetailContent'
import { PostDetailHeader } from '@/components/domain/post/PostDetailHeader'
import { Loading } from '@/components/view/Loading'
import { PostProfile } from '@/components/view/Profile'
import { useCarpoolDetail } from '@/services/query/useCarpoolQuery'
import { useCarpoolDetailActions } from '@/services/service/useCarpoolDetailActions'
import type { CustomPostDetailType } from '@/types/post'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

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
//     price: 4000,
//     full: false,
//     content:
//       '빠르게 조기퇴소 하실 분들 구해여. 현재 3년차 이상 두명 있습니다. 같이 하실 분들 연락주세요.',
//   },
// }

const transformCarpoolData = (item: CustomPostDetailType['item']) => [
  { label: '훈련 날짜', content: item.trainingDate },
  { label: '출발 장소', content: [item.place, item.time] },
  {
    label: '모집 정보',
    content: [`${item.personnel}명`, item.price === 0 ? '무료' : `${item.price}원`],
  },
  { label: '메모', content: item.content },
]

export const CarpoolDetail = () => {
  const { id } = useParams()
  if (!id) return <ErrorPage />

  const carpoolBoardId = parseInt(id)

  const {
    data: detailData,
    isPending,
    isError,
  } = useCarpoolDetail({ urls: { carpoolBoardId: carpoolBoardId } })

  const { handleCheckFull, handleEdit, handleDelete, handleClickChatting } =
    useCarpoolDetailActions(carpoolBoardId, detailData?.item.full as boolean)
  // const { handleCheckFull, handleEdit, handleDelete, handleClickChatting } =
  //   useCarpoolDetailActions(carpoolBoardId, dummy.item.full as boolean)

  if (isPending) return <Loading />
  if (isError || !detailData) return <ErrorPage />

  const { profile, item } = detailData
  // const { profile, item } = dummy

  const isMyPost = profile.nickname === getSessionStorageItem(SESSION_KEYS.NICKNAME)
  const contents = transformCarpoolData(item)

  return (
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
  )
}
