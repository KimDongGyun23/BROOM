import { styled } from 'styled-components'

import { FlexColumnContainer } from '@/app/style/commonStyles'
import { useFetchPostDetail } from '@/features/board/api/useBoard.query'
import { useBookmarkActions } from '@/features/board/model/bookmark.store'
import { usePostDetail, usePostDetailActions } from '@/features/board/model/postDetail.store'
import { PostBookmarkButton } from '@/features/board/ui/PostBookmarkButton'
import { PostChatButton } from '@/features/board/ui/PostChatButton'
import { PostDetailContent } from '@/features/board/ui/PostDetailContent'
import { PostDetailHeader } from '@/features/board/ui/PostDetailHeader'
import { PostProfile } from '@/features/board/ui/PostProfile'
import { instance } from '@/app/api'
import { useParamId } from '@/shared/hook/useParamId'
import { Loading } from '@/shared/ui/Loading'

import { ErrorPage } from '../home/ErrorPage'

export const PostDetail = () => {
  const boardId = useParamId()
  const post = usePostDetail()
  const session = instance.hasToken()

  const { data, isPending, isError } = useFetchPostDetail({ urls: { boardId } })
  const { updatePostDetail } = usePostDetailActions()
  const { initializeBookmarkState } = useBookmarkActions()

  if (isPending) return <Loading />
  if (isError || !post) return <ErrorPage />

  updatePostDetail(data)
  initializeBookmarkState(data.status.bookmark)

  return (
    <FlexColumnContainer>
      <PostDetailHeader />
      <PostProfile />
      <PostDetailContent />

      {session && (
        <ButtonContainer>
          <PostBookmarkButton />
          <PostChatButton />
        </ButtonContainer>
      )}
    </FlexColumnContainer>
  )
}

const ButtonContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', undefined, 'xl')};
    ${theme.boxShadow('md')};
    ${theme.padding('sm', 'lg', 'xl')};
  `}
`
