import { PostDetailHeader } from '@/components/domain/post/PostDetailHeader'
import { TeamDetailFooter } from '@/components/domain/post/TeamDetailFooter'
import { Loading } from '@/components/view/Loading'
import { PostDetailContent } from '@/components/view/post/PostDetailContent'
import { PostContainer } from '@/components/view/post/PostStyle'
import { PostProfile } from '@/components/view/Profile'
import { usePostDetailData } from '@/services/service/usePostDetailData'

import { ErrorPage } from '../home/ErrorPage'

export const TeamDetail = () => {
  const { postDetail, isPending, isError } = usePostDetailData()

  if (isPending) return <Loading />
  if (isError || !postDetail) return <ErrorPage />

  return (
    <>
      <PostContainer>
        <PostDetailHeader />
        <PostProfile />
        <PostDetailContent />
        <TeamDetailFooter />
      </PostContainer>
    </>
  )
}
