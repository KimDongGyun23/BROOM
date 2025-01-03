import { useParams } from 'react-router-dom'

import {
  Loading,
  PostBottom,
  PostDetailContent,
  PostDetailHeader,
  PostProfile,
} from '@/components/view'
import { useCarpoolDetailPage } from '@/services/query'
import { useCarpoolDetailActions } from '@/services/service'
import type { CustomCarpoolDetailType } from '@/types'
import { getSessionStorageItem, SESSION_NICKNAME } from '@/utils'

const transformCarpoolData = (item: CustomCarpoolDetailType['item']) => [
  { label: '훈련 날짜', content: item.trainingDate },
  { label: '출발 장소', content: [item.departPlace, item.departTime] },
  {
    label: '모집 정보',
    content: [`${item.personnel}명`, item.price === 0 ? '무료' : `${item.price}원`],
  },
  { label: '메모', content: item.content },
]

export const CarpoolDetail = () => {
  const { id } = useParams()
  const carpoolBoardId = id ? parseInt(id) : null

  const {
    data: detailData,
    isPending,
    isError,
  } = useCarpoolDetailPage({ urls: { carpoolBoardId: carpoolBoardId ?? 0 } })

  const { handleCheckFull, handleEdit, handleDelete, handleClickChatting } =
    useCarpoolDetailActions(carpoolBoardId ?? 0, detailData?.item.full ?? false)

  if (isPending) return <Loading />
  if (isError || !detailData) return <div>error</div>

  const isMyPost = detailData.profile.nickname === getSessionStorageItem(SESSION_NICKNAME)
  const contents = transformCarpoolData(detailData.item)

  return (
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
  )
}
