import { FlexColumnContainer } from '@/app/style/commonStyles'
import { DeleteConfirmationModal } from '@/features/post/delete-post/ui/DeleteConfirmationModal'
import { DeletePostSuccessModal } from '@/features/post/delete-post/ui/DeletePostSuccessModal'
import { usePostDetailData } from '@/features/post/post-detail/model/usePostDetailData'
import { PostDetailBottom } from '@/features/post/post-detail/ui/PostDetailBottom'
import { PostDetailContent } from '@/features/post/post-detail/ui/PostDetailContent'
import { PostDetailHeader } from '@/features/post/post-detail/ui/PostDetailHeader'
import { PostDetailProfile } from '@/features/post/post-detail/ui/PostDetailProfile'

export const PostDetail = () => {
  usePostDetailData()

  return (
    <FlexColumnContainer>
      <PostDetailHeader />
      <PostDetailProfile />
      <PostDetailContent />
      <PostDetailBottom />

      <DeleteConfirmationModal />
      <DeletePostSuccessModal />
    </FlexColumnContainer>
  )
}
