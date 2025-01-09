import { useParams } from 'react-router-dom'

import { PostBottom } from '@/components/domain/post/PostBottom'
import { PostDetailContent } from '@/components/domain/post/PostDetailContent'
import { PostDetailHeader } from '@/components/domain/post/PostDetailHeader'
import { Loading } from '@/components/view/Loading'
import { PostProfile } from '@/components/view/Profile'
import { useCarpoolDetailPage } from '@/services/query'
import { useCarpoolDetailActions } from '@/services/service'
import type { CustomPostDetailType } from '@/types/post'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

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
  if (!id) return <div>error</div>

  const carpoolBoardId = parseInt(id)

  const {
    data: detailData,
    isPending,
    isError,
  } = useCarpoolDetailPage({ urls: { carpoolBoardId: carpoolBoardId } })

  const { handleCheckFull, handleEdit, handleDelete, handleClickChatting } =
    useCarpoolDetailActions(carpoolBoardId, detailData?.item.full as boolean)

  if (isPending) return <Loading />
  if (isError || !detailData) return <div>error</div>

  const { profile, item } = detailData

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
        onClickBookmark={() => {}}
        onClickChattingButton={handleClickChatting}
      />
    </div>
  )
}
