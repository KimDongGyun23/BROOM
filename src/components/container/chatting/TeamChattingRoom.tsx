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
import { useTeamChattingInfo, useTeamExitChattingRoom } from '@/services/query/useChattingQuery'
import { useMessageActions } from '@/stores/message'

type ChattingKebabProps = {
  isKebabOpen: boolean
}

const ChattingKebab = ({ isKebabOpen }: ChattingKebabProps) => {
  const navigate = useNavigate()
  const { id: roomId } = useParams()
  const { mutate: exitRoom } = useTeamExitChattingRoom()

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

  if (isKebabOpen) return <Kebab items={kebabMap} position={[48, 16]} />
  return null
}

export const TeamChattingRoom = () => {
  const { id: roomId } = useParams()
  const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)
  const { initialMessage } = useMessageActions()

  const {
    data: teamRoomData,
    isPending,
    isError,
  } = useTeamChattingInfo({
    urls: { chatRoomId: roomId as string },
  })

  useEffect(() => {
    if (teamRoomData) initialMessage(teamRoomData.previousMessages)
  }, [teamRoomData])

  if (isPending) return <Loading />
  if (isError) return <div>error</div>

  return (
    <Container>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      <ChattingRoomProfile
        opponent={teamRoomData.opponentNickname}
        iconType={teamRoomData.militaryChaplain}
        dischargeYear={teamRoomData.yearsSinceDischarge}
        title={teamRoomData.teamBoardTitle}
      />

      <ChattingKebab isKebabOpen={isKebabOpen} />
      <MessageList
        opponent={teamRoomData.opponentNickname}
        iconType={teamRoomData.militaryChaplain}
      />
      <MessageBox />
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`
