import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { MessageBox } from '@/components/domain/chatting/MessageBox'
import { MessageList } from '@/components/domain/chatting/MessageList'
import { Kebab } from '@/components/view/Kebab'
import { Loading } from '@/components/view/Loading'
import { ChattingRoomProfile } from '@/components/view/Profile'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import {
  useCarpoolChattingInfo,
  useCarpoolExitChattingRoom,
} from '@/services/query/useChattingQuery'
import { useMessageActions } from '@/stores/message'

type ChattingKebabProps = {
  isKebabOpen: boolean
}

const ChattingKebab = ({ isKebabOpen }: ChattingKebabProps) => {
  const navigate = useNavigate()
  const { id: roomId } = useParams()
  const { mutate: exitRoom } = useCarpoolExitChattingRoom()

  const kebabMap = [
    {
      label: '채팅방 나가기',
      onClick: () => {
        exitRoom({ urls: { chatRoomId: roomId as string } })
        navigate('/chatting')
      },
    },
    { label: '차단하기', onClick: () => console.log('차단하기'), isRed: true },
  ]

  if (isKebabOpen) return <Kebab items={kebabMap} position={[48, 16, 0, 0]} />
  return null
}

export const CarpoolChattingRoom = () => {
  const { id: roomId } = useParams()
  const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)
  const { initialMessage } = useMessageActions()

  const {
    data: carpoolRoomData,
    isPending,
    isError,
  } = useCarpoolChattingInfo({
    urls: { chatRoomId: roomId as string },
  })

  useEffect(() => {
    if (carpoolRoomData) initialMessage(carpoolRoomData.previousMessages)
  }, [carpoolRoomData])

  if (isPending) return <Loading />
  if (isError) return <div>error</div>

  return (
    <Container>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      <ChattingRoomProfile
        opponent={carpoolRoomData.opponentNickname}
        iconType={carpoolRoomData.militaryChaplain}
        dischargeYear={carpoolRoomData.yearsSinceDischarge}
        title={carpoolRoomData.carpoolBoardTitle}
      />

      <ChattingKebab isKebabOpen={isKebabOpen} />
      <MessageList
        opponent={carpoolRoomData.opponentNickname}
        iconType={carpoolRoomData.militaryChaplain}
      />
      <MessageBox />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
