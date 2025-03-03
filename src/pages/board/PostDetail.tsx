import { FlexColumnContainer } from '@/app/style/commonStyles'
import { usePostDetailActions } from '@/entities/board/model/postDetail.store'
import { useFetchPostDetail } from '@/features/board/api/useBoard.query'
import { PostDetailContent } from '@/features/board/ui/PostDetailContent'
import { PostProfile } from '@/features/board/ui/PostProfile'
import { useParamId } from '@/shared/hook/useParamId'
import { Loading } from '@/shared/ui/Loading'
import { PostDetailBottom } from '@/widgets/post-detail/ui/PostDetailBottom'
import { PostDetailHeader } from '@/widgets/post-detail/ui/PostDetailHeader'

import { ErrorPage } from '../home/ErrorPage'

export const PostDetail = () => {
  const boardId = useParamId()

  const { data, isPending, isError } = useFetchPostDetail({ urls: { boardId } })
  const { updatePostDetail } = usePostDetailActions()

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  updatePostDetail(data)

  return (
    <FlexColumnContainer>
      <PostDetailHeader />
      <PostProfile />
      <PostDetailContent />
      <PostDetailBottom />
    </FlexColumnContainer>
  )
}
