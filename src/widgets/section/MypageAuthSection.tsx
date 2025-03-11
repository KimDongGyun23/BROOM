import { styled } from 'styled-components'

import { DeleteIdButton } from '@/widgets/button/DeleteIdButton'
import { LogoutButton } from '@/widgets/button/LogoutButton'

export const MypageAuthSection = () => {
  return (
    <ButtonContainer>
      <LogoutButton />
      <span className="divider" />
      <DeleteIdButton />
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
