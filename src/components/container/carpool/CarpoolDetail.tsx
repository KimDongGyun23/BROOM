import { useEffect } from 'react'
import { styled } from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { CarpoolBookmarkButton } from '@/components/domain/post/CarpoolBookmarkButton'
import { CarpoolChattingButton } from '@/components/domain/post/CarpoolChattingButton'
import { CarpoolDeleteModal } from '@/components/domain/post/CarpoolDeleteModal'
import { CarpoolDetailContent } from '@/components/domain/post/CarpoolDetailContent'
import { CarpoolDetailHeader } from '@/components/domain/post/CarpoolDetailHeader'
import { Loading } from '@/components/view/Loading'
import { PostProfile } from '@/components/view/Profile'
import { useParamId } from '@/hooks/useParamId'
import { instance } from '@/query'
import { useFetchCarpoolDetail } from '@/query/useCarpoolQuery'
import { ModalStoreProvider } from '@/stores/modal'
import { usePostDetail, usePostDetailActions } from '@/stores/post'
import { canJoinChatRoom } from '@/utils/canJoinChatRoom'

import { ErrorPage } from '../home/ErrorPage'

const usePostDetailData = () => {
  const boardId = useParamId()
  const { data, isPending, isError } = useFetchCarpoolDetail({ urls: { boardId } })
  const { updatePostDetail } = usePostDetailActions()

  useEffect(() => {
    if (data) updatePostDetail(data)
  }, [data, updatePostDetail])

  return { isPending, isError }
}

export const CarpoolDetail = () => {
  const post = usePostDetail()
  const session = instance.hasToken()
  const { isPending, isError } = usePostDetailData()

  if (isPending) return <Loading />
  if (isError || !post) return <ErrorPage />

  return (
    <ModalStoreProvider>
      <Container>
        <CarpoolDetailHeader />
        <PostProfile />
        <CarpoolDetailContent />

        {session && (
          <ButtonContainer>
            <CarpoolBookmarkButton initialIsBookmarked={post.status.bookmark} />
            <CarpoolChattingButton
              isFull={!canJoinChatRoom(post.status.currentPersonnel, post.status.totalPersonnel)}
            />
          </ButtonContainer>
        )}
      </Container>

      <CarpoolDeleteModal />
    </ModalStoreProvider>
  )
}

const ButtonContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xl')};
  ${({ theme }) => theme.boxShadow('md')};
  ${({ theme }) => theme.padding('sm', 'lg', 'xl')};
  width: 100%;
`
