import styled from 'styled-components'

import { BookmarkButton } from '@/features/bookmark/ui/BookmarkButton'
import { EnterChatButton } from '@/features/enter-chat/ui/EnterChatButton'
import { useIsLoggedIn } from '@/features/login/model/auth.store'
import { ModalStoreProvider } from '@/shared/model/modal.store'

export const PostDetailBottom = () => {
  const isLoggedIn = useIsLoggedIn()

  if (!isLoggedIn) return null

  return (
    <Container>
      <BookmarkButton />

      <ModalStoreProvider>
        <EnterChatButton />
        {/* <ModalWithOneButton /> */}
      </ModalStoreProvider>
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
