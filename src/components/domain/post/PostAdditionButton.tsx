import styled from 'styled-components'

import { AdditionIcon } from '@/components/view/icons/NonActiveIcons'

type PostAdditionButtonProps = {
  onClick: VoidFunction
}

export const PostAdditionButton = ({ onClick }: PostAdditionButtonProps) => {
  return (
    <AddButton type="button" onClick={onClick}>
      <AdditionIcon />
      <ButtonText>글 올리기</ButtonText>
    </AddButton>
  )
}

const AddButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', 'center', 'xs')};
  ${({ theme }) => theme.borderRadius('lg')};
  ${({ theme }) => theme.boxShadow('sm')};
  position: absolute;
  bottom: 88px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px ${({ theme }) => theme.gap.xl} 2px 10px;
  border: 2px solid ${({ theme }) => theme.colors.black[100]};
`

const ButtonText = styled.p`
  ${({ theme }) => theme.font(800, theme.colors.black[600])};
`
