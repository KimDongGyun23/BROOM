import styled from 'styled-components'

import { BookmarkButton } from '@/features/bookmark/ui/BookmarkButton'
import { EnterChatButton } from '@/widgets/button/EnterChatButton'
import { useIsLoggedIn } from '@/features/login/model/auth.store'

export const PostDetailBottom = () => {
  const isLoggedIn = useIsLoggedIn()

  if (!isLoggedIn) return null

  return (
    <Container>
      <BookmarkButton />
      <EnterChatButton />
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', undefined, 'xl')};
    ${theme.boxShadow('md')};
    ${theme.padding('sm', 'lg', 'xl')};
  `}
`
