import { styled } from 'styled-components'

import { FlexColumnContainer } from '@/app/style/commonStyles'
import { useFetchPostDetail } from '@/features/board/api/useBoard.query'
import { usePostDetailActions } from '@/features/board/model/postDetail.store'
import { PostChatButton } from '@/features/board/ui/PostChatButton'
import { PostDetailContent } from '@/features/board/ui/PostDetailContent'
import { PostProfile } from '@/features/board/ui/PostProfile'
import { BookmarkButton } from '@/features/bookmark/ui/BookmarkButton'
import { useParamId } from '@/shared/hook/useParamId'
import { useIsLoggedIn } from '@/shared/model/auth.store'
import { Loading } from '@/shared/ui/Loading'
import { PostDetailHeader } from '@/widgets/post-detail/ui/PostDetailHeader'

import { ErrorPage } from '../home/ErrorPage'

export const PostDetail = () => {
  const boardId = useParamId()
  const isLoggedIn = useIsLoggedIn()

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

      {isLoggedIn && (
        <ButtonContainer>
          <BookmarkButton />
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
