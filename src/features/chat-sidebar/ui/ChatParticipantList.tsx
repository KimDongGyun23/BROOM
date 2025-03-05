import { styled } from 'styled-components'

import type { User } from '@/entities/chat/model/chat.type'
import type { MilitaryBranchCode } from '@/shared/lib/constants'
import { useUserData } from '@/features/login/model/auth.store'
import { CrownIcon } from '@/shared/ui/icons/NonActiveIcons'
import { ProfileImage } from '@/shared/ui/ProfileImage'

import { ChatExpelButton } from '../../expel-user/ui/ChatExpelButton'

type ChatParticipantListProps = {
  participantList: User[]
}

type ChatParticipantItemProps = {
  isAuthor: boolean
  isChatRoomMine: boolean
  participant: User
}

const ChatParticipantItem = ({
  isAuthor,
  isChatRoomMine,
  participant,
}: ChatParticipantItemProps) => {
  const { userId, userNickname, militaryBranch } = participant

  return (
    <ParticipantItem>
      <ProfileImage size="sm" iconType={militaryBranch as MilitaryBranchCode} />
      <ProfileInfo>
        <p>{userNickname}</p>
        {isAuthor && <CrownIcon />}
      </ProfileInfo>
      {isChatRoomMine && !isAuthor && <ChatExpelButton userId={userId} />}
    </ParticipantItem>
  )
}

export const ChatParticipantList = ({ participantList }: ChatParticipantListProps) => {
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

const ParticipantItem = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')};
`

const ProfileInfo = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  ${({ theme }) => theme.font(800, theme.colors.black[100])};
  flex-grow: 1;
`
