import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import { Button } from '@/components/view/Button'
import { ModalWithOneButton } from '@/components/view/Modal'
import { useParamId } from '@/hooks/useParamId'
import { useFetchChatRoomInformation } from '@/query/useChattingQuery'
import { useModalActions, useModalState } from '@/stores/modal'

type CarpoolChattingButtonProps = {
  isFull: boolean
}

export const CarpoolChattingButton = ({ isFull }: CarpoolChattingButtonProps) => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { isModalOpen, label } = useModalState()
  const { openModal, closeModal } = useModalActions()

  const { refetch } = useFetchChatRoomInformation({ urls: { boardId } })

  const handleClickChatButton = async () => {
    const { isSuccess, isError, error } = await refetch()
    if (isSuccess) navigate(`/chat/${boardId}`)
    else if (isError) openModal(error.message, true)
  }

  return (
    <>
      <ChattingStyledButton
        secondary={isFull}
        size="sm"
        onClick={handleClickChatButton}
        disabled={isFull}
      >
        {isFull ? '모집 마감' : '채팅하기'}
      </ChattingStyledButton>

      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content={label}
        button={{ onClick: closeModal, label: '확인' }}
      />
    </>
  )
}

const ChattingStyledButton = styled(Button)`
  flex-grow: 1;
`
