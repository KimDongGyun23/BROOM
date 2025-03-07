import { styled } from 'styled-components'

import { DeleteIdButton } from '@/features/delete-id/ui/DeleteIdButton'
import { DeleteIdModal } from '@/features/delete-id/ui/DeleteIdModal'
import { LogoutButton } from '@/features/logout/ui/LogoutButton'
import { ModalStoreProvider } from '@/shared/model/modal.store'

export const MypageAuthSection = () => {
  return (
    <ButtonContainer>
      <LogoutButton />

      <span className="divider" />

      <ModalStoreProvider>
        <DeleteIdButton />
        <DeleteIdModal />
      </ModalStoreProvider>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center')}
    ${theme.margin('mypage-button')}
    ${theme.padding(0, 'xs')}
  `}

  .divider {
    ${({ theme }) => theme.border('underline', 'right')};
    height: 100%;
  }
`
