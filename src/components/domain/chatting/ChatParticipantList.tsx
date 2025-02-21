import { styled } from 'styled-components'

import { CrownIcon } from '@/components/view/icons/NonActiveIcons'
import { ProfileImage } from '@/components/view/ProfileImage'
import type { User } from '@/types/chat'
import type { MilitaryBranchCode } from '@/utils/constants'
import { getSessionStorageItem } from '@/utils/storage'

type ChatParticipantListProps = {
  participantList: User[]
}

type ChatParticipantItemProps = {
  militaryBranch: MilitaryBranchCode
  userNickname: string
  isAuthor: boolean
  isChatRoomMine: boolean
}

const ChatParticipantItem = ({
  isAuthor,
  isChatRoomMine,
  militaryBranch,
  userNickname,
}: ChatParticipantItemProps) => {
  return (
    <ParticipantItem>
      <ProfileImage size="sm" iconType={militaryBranch as MilitaryBranchCode} />
      <ProfileInfo>
        <p>{userNickname}</p>
        {isAuthor && <CrownIcon />}
      </ProfileInfo>
      {isChatRoomMine && <ExpelButton>내보내기</ExpelButton>}
    </ParticipantItem>
  )
}

export const ChatParticipantList = ({ participantList }: ChatParticipantListProps) => {
  const myNickname = getSessionStorageItem('nickname')
  const isChatRoomMine = myNickname === participantList[0].userNickname

  return (
    <Container>
      {participantList.map((participant, index) => (
        <ChatParticipantItem
          key={participant.userId}
          isAuthor={index === 0}
          isChatRoomMine={isChatRoomMine}
          {...participant}
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

const ExpelButton = styled.button`
  ${({ theme }) => theme.padding('xs', 'sm')};
  ${({ theme }) => theme.font(900, theme.colors.orange)};
  ${({ theme }) => theme.borderRadius('md')};
  background-color: ${({ theme }) => theme.colors.black[100]};
`
