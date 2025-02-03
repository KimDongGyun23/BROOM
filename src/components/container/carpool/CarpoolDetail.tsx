import { CarpoolDetailFooter } from '@/components/domain/post/CarpoolDetailFooter'
import { PostDetailHeader } from '@/components/domain/post/PostDetailHeader'
import { Loading } from '@/components/view/Loading'
import { PostDetailContent } from '@/components/view/post/PostDetailContent'
import { PostProfile } from '@/components/view/Profile'
import { usePostDetailData } from '@/services/service/usePostDetailData'
import { Container } from '@/styles/commonStyles'

import { ErrorPage } from '../home/ErrorPage'

export const CarpoolDetail = () => {
  const { postDetail, isPending, isError } = usePostDetailData()

  if (isPending) return <Loading />
  if (isError || !postDetail) return <ErrorPage />

  return (
    <Container>
      <PostDetailHeader />
      <PostProfile />
      <PostDetailContent />
      <CarpoolDetailFooter />
    </Container>
  )
}
