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
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 88px;
  left: 50%;
  transform: translateX(-50%);
  gap: ${({ theme }) => theme.gap.xs};
  padding: 2px ${({ theme }) => theme.gap.xl} 2px 10px;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.colors.black[100]};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
`

const ButtonText = styled.p`
  font-size: ${({ theme }) => theme.fontSize[800]};
  line-height: ${({ theme }) => theme.lineHeight[800]};
  color: ${({ theme }) => theme.colors.black[600]};
`
