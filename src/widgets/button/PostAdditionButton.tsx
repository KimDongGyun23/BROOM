import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useIsLoggedIn } from '@/features/login/model/auth.store'
import { AdditionIcon } from '@/shared/ui/icons/NonActiveIcons'

export const PostAdditionButton = () => {
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()

  const handleButtonClick = () => navigate('/board/create')

  if (!isLoggedIn) return null

  return (
    <StyledButton type="button" onClick={handleButtonClick}>
      <AdditionIcon />
      <ButtonText>글 올리기</ButtonText>
    </StyledButton>
  )
}

const StyledButton = styled.button`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', 'center', 'xs')}
    ${theme.padding('sm', 'lg', 'sm', 'md')}
    ${theme.border('post-addition-button')}
    ${theme.borderRadius('lg')}
    ${theme.boxShadow('sm')}
  `}
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
`

const ButtonText = styled.p`
  ${({ theme }) => theme.font(800, theme.colors.black[600])};
`
