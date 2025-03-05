import { styled } from 'styled-components'

import { useSidebarActions } from '@/features/chat-sidebar/model/sidebar.store'
import { ModalStoreProvider } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

import { useExpelUser } from '../hook/useExpelUser'

type ChatExpelButtonProps = {
  userId: string
}

const ExpelButton = ({ userId }: ChatExpelButtonProps) => {
  const handleExpelUser = useExpelUser(userId)

  return <StyledButton onClick={handleExpelUser}>내보내기</StyledButton>
}

export const ChatExpelButton = ({ userId }: ChatExpelButtonProps) => {
  const { closeSidebar } = useSidebarActions()

  return (
    <ModalStoreProvider>
      <ExpelButton userId={userId} />
      <ModalWithOneButton onClickButton={closeSidebar} />
    </ModalStoreProvider>
  )
}

const StyledButton = styled.button`
  ${({ theme }) => `
    ${theme.padding('xs', 'sm')};
    ${theme.font(900, theme.colors.orange)}
    ${theme.borderRadius('md')}
  `}
  background-color: ${({ theme }) => theme.colors.black[100]};
`
