import { useEffect } from 'react'

import { CarpoolDetailFooter } from '@/components/domain/post/CarpoolDetailFooter'
import { PostDetailHeader } from '@/components/domain/post/PostDetailHeader'
import { Loading } from '@/components/view/Loading'
import { PostDetailContent } from '@/components/view/post/PostDetailContent'
import { PostProfile } from '@/components/view/Profile'
import { useParamId } from '@/hooks/useParamId'
import { usePostDetail } from '@/services/query/usePostQuery'
import { ModalStoreProvider } from '@/stores/modal'
import { usePostDetailActions } from '@/stores/post'
import { Container } from '@/styles/commonStyles'

import { ErrorPage } from '../home/ErrorPage'

const usePostDetailData = () => {
  const boardId = useParamId()
  const { data, isPending, isError } = usePostDetail({ urls: { boardId } })
  const { setPostDetail } = usePostDetailActions()

  useEffect(() => {
    if (data) setPostDetail(data)
  }, [data, setPostDetail])

  return { isPending, isError }
}

export const CarpoolDetail = () => {
  const { isPending, isError } = usePostDetailData()

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <ModalStoreProvider>
      <Container>
        <PostDetailHeader />
        <PostProfile />
        <PostDetailContent />
        <CarpoolDetailFooter />
      </Container>
    </ModalStoreProvider>
  )
}
