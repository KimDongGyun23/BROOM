import { CarpoolDetailFooter } from '@/components/domain/post/CarpoolDetailFooter'
import { CarpoolDetailHeader } from '@/components/domain/post/CarpoolDetailHeader'
import { Loading } from '@/components/view/Loading'
import { PostDetailContent } from '@/components/view/post/PostDetailContent'
import { PostContainer } from '@/components/view/post/PostStyle'
import { PostProfile } from '@/components/view/Profile'
import { usePostInitialize } from '@/services/service/usePostInitialize'

import { ErrorPage } from '../home/ErrorPage'

export const CarpoolDetail = () => {
  const { postDetail, isPending, isError } = usePostInitialize()

  if (isPending) return <Loading />
  if (isError || !postDetail) return <ErrorPage />

  return (
    <PostContainer>
      <CarpoolDetailHeader />
      <PostProfile />
      <PostDetailContent />
      <CarpoolDetailFooter />
    </PostContainer>
  )
}
