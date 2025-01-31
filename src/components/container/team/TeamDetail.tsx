import { TeamDetailFooter } from '@/components/domain/post/TeamDetailFooter'
import { TeamDetailHeader } from '@/components/domain/post/TeamDetailHeader'
import { Loading } from '@/components/view/Loading'
import { PostDetailContent } from '@/components/view/post/PostDetailContent'
import { PostContainer } from '@/components/view/post/PostStyle'
import { PostProfile } from '@/components/view/Profile'
import { usePostInitialize } from '@/services/service/usePostInitialize'

import { ErrorPage } from '../home/ErrorPage'

export const TeamDetail = () => {
  const { postDetail, isPending, isError } = usePostInitialize()

  if (isPending) return <Loading />
  if (isError || !postDetail) return <ErrorPage />

  return (
    <>
      <PostContainer>
        <TeamDetailHeader />
        <PostProfile />
        <PostDetailContent />
        <TeamDetailFooter />
      </PostContainer>
    </>
  )
}
