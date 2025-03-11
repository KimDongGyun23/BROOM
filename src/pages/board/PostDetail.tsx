import { FlexColumnContainer } from '@/app/style/commonStyles'
import { useFetchPostDetail } from '@/entities/board/api/useBoard.query'
import { usePostDetailActions } from '@/entities/board/model/postDetail.store'
import { useParamId } from '@/shared/hook/useParamId'
import { PostDetailHeader } from '@/widgets/header/PostDetailHeader'
import { PostDetailBottom } from '@/widgets/post-detail/ui/PostDetailBottom'
import { PostDetailContent } from '@/widgets/post-detail/ui/PostDetailContent'
import { PostDetailProfile } from '@/widgets/post-detail/ui/PostDetailProfile'

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
