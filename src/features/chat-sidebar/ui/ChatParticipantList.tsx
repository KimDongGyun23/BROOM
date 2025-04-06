import { styled } from 'styled-components'

import type { User } from '@/entities/chat/model/chat.type'
import { useUserData } from '@/entities/auth/model/auth.store'

import { ChatParticipantItem } from './ChatParticipantItem'

type Props = {
  participantList: User[]
}

export const ChatParticipantList = ({ participantList }: Props) => {
  const user = useUserData()
  const isChatRoomMine = user?.nickname === participantList[0].userNickname

  return (
    <Container>
      {participantList.map((participant, index) => (
        <ChatParticipantItem
          key={participant.userId}
          isAuthor={index === 0}
          isChatRoomMine={isChatRoomMine}
          participant={participant}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.padding('md', 0)};
  flex-grow: 1;
  overflow-y: scroll;
`
