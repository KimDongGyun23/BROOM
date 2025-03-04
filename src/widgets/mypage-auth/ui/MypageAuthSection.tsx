import { styled } from 'styled-components'

import { DeleteIdButton } from '@/features/delete-id/ui/DeleteIdButton'
import { DeleteIdModal } from '@/features/delete-id/ui/DeleteIdModal'
import { LogoutButton } from '@/features/logout/ui/LogoutButton'
import { LogoutModal } from '@/features/logout/ui/LogoutModal'
import { ModalStoreProvider } from '@/shared/model/modal.store'

export const MypageAuthSection = () => {
  return (
    <ButtonContainer>
      <ModalStoreProvider>
        <LogoutButton />
        <LogoutModal />
      </ModalStoreProvider>

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
