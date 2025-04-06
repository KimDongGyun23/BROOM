import { styled } from 'styled-components'

import { useExpelUser } from '../model/useExpelUser'

type Props = {
  userId: string
}

export const ExpelChatButton = ({ userId }: Props) => {
  const handleExpelUser = useExpelUser(userId)

  return <StyledButton onClick={handleExpelUser}>내보내기</StyledButton>
}

const StyledButton = styled.button`
  ${({ theme }) => `
    ${theme.padding('xs', 'sm')};
    ${theme.font(900, theme.colors.orange)}
    ${theme.borderRadius('md')}
  `}
  background-color: ${({ theme }) => theme.colors.black[100]};
`
