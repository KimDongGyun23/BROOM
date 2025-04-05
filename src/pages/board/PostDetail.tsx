import { FlexColumnContainer } from '@/app/style/commonStyles'
import { usePostDetailData } from '@/features/post-detail/model/usePostDetailData'
import { PostDetailBottom } from '@/features/post-detail/ui/PostDetailBottom'
import { PostDetailContent } from '@/features/post-detail/ui/PostDetailContent'
import { PostDetailHeader } from '@/features/post-detail/ui/PostDetailHeader'
import { PostDetailProfile } from '@/features/post-detail/ui/PostDetailProfile'

export const PostDetail = () => {
  usePostDetailData()

  return (
    <FlexColumnContainer>
      <PostDetailHeader />
      <PostDetailProfile />
      <PostDetailContent />
      <PostDetailBottom />
    </FlexColumnContainer>
  )
}
