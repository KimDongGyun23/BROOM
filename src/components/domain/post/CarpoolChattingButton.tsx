import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import { Button } from '@/components/view/Button'
import { useParamId } from '@/hooks/useParamId'
import { useCarpoolChattingId } from '@/query/useChattingQuery'

type CarpoolChattingButtonProps = {
  isFull: boolean
}

export const CarpoolChattingButton = ({ isFull }: CarpoolChattingButtonProps) => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { mutate: chattingMutation } = useCarpoolChattingId()

  const handleClickChatting = () => {
    chattingMutation(
      { urls: { carpoolBoardId: boardId } },
      {
        onSuccess: ({ chatRoomId }) => navigate(`/chatting/chatting-room/carpool/${chatRoomId}`),
      },
    )
  }

  return (
    <ChattingStyledButton
      secondary={isFull}
      size="sm"
      onClick={handleClickChatting}
      disabled={isFull}
    >
      {isFull ? '모집 마감' : '채팅하기'}
    </ChattingStyledButton>
  )
}

const ChattingStyledButton = styled(Button)`
  flex-grow: 1;
`
