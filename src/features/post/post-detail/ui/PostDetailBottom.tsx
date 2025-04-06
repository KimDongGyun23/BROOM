import styled from 'styled-components'

import { useIsLoggedIn } from '@/entities/auth/model/auth.store'
import { EnterChatButton } from '@/features/chat/enter-chat/ui/EnterChatButton'
import { EnterChatErrorModal } from '@/features/chat/enter-chat/ui/EnterChatErrorModal'

import { BookmarkButton } from '../../bookmark/ui/BookmarkButton'
import { BookmarkSuccessModal } from '../../bookmark/ui/BookmarkSuccessModal'

export const PostDetailBottom = () => {
  const isLoggedIn = useIsLoggedIn()

  if (!isLoggedIn) return null

  return (
    <Container>
      <BookmarkButton />
      <EnterChatButton />

      <BookmarkSuccessModal />
      <EnterChatErrorModal />
    </Container>
  )
}

const Container = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', undefined, 'xl')};
    ${theme.boxShadow('md')};
    ${theme.padding('sm', 'lg', 'xl')};
  `}
`
