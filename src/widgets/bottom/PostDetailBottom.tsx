import styled from 'styled-components'

import { useIsLoggedIn } from '@/features/login/model/auth.store'
import { BookmarkButton } from '@/widgets/button/BookmarkButton'
import { EnterChatButton } from '@/widgets/button/EnterChatButton'

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
