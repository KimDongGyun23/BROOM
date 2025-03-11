import { FlexColumnContainer } from '@/app/style/commonStyles'
import { useFetchPostDetail } from '@/entities/board/api/useBoard.query'
import { usePostDetailActions } from '@/entities/board/model/postDetail.store'
import { useParamId } from '@/shared/hook/useParamId'
import { PostDetailBottom } from '@/widgets/bottom/PostDetailBottom'
import { PostDetailHeader } from '@/widgets/header/PostDetailHeader'
import { PostDetailProfile } from '@/widgets/profile/PostDetailProfile'
import { PostDetailContent } from '@/widgets/section/PostDetailContent'

export const PostDetail = () => {
  const boardId = useParamId()

  const { data } = useFetchPostDetail({ urls: { boardId } })
  const { updatePostDetail } = usePostDetailActions()

  updatePostDetail(data)

  return (
    <FlexColumnContainer>
      <PostDetailHeader />
      <PostDetailProfile />
      <PostDetailContent />
      <PostDetailBottom />
    </FlexColumnContainer>
  )
}
