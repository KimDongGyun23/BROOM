import { styled } from 'styled-components'

import { DeleteIdButton } from '@/features/delete-id/ui/DeleteIdButton'
import { LogoutButton } from '@/features/logout/ui/LogoutButton'

export const AuthenticationSection = () => {
  return (
    <>
      <ButtonContainer>
        <LogoutButton />
        <span className="divider" />
        <DeleteIdButton />
      </ButtonContainer>
    </>
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
