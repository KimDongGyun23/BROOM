import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { instance } from '@/app/api'
import { AdditionIcon } from '@/shared/ui/icons/NonActiveIcons'

export const PostAdditionButton = () => {
  const navigate = useNavigate()
  const session = instance.hasToken()
  const handleButtonClick = () => navigate('/carpool/create')

  if (!session) return null

  return (
    <AddButton type="button" onClick={handleButtonClick}>
      <AdditionIcon />
      <ButtonText>글 올리기</ButtonText>
    </AddButton>
  )
}

const AddButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', 'center', 'xs')};
  ${({ theme }) => theme.padding('sm', 'lg', 'sm', 'md')};
  ${({ theme }) => theme.border('post-addition-button')};
  ${({ theme }) => theme.borderRadius('lg')};
  ${({ theme }) => theme.boxShadow('sm')};
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
`

const ButtonText = styled.p`
  ${({ theme }) => theme.font(800, theme.colors.black[600])};
`
