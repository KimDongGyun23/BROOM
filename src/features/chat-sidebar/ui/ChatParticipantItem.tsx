import { styled } from 'styled-components'

import type { User } from '@/entities/chat/model/chat.type'
import { ExpelChatButton } from '@/features/expel-user/ui/ExpelChatButton'
import type { MilitaryBranchCode } from '@/shared/lib/constants'
import { CrownIcon } from '@/shared/ui/icons/NonActiveIcons'
import { ProfileImage } from '@/shared/ui/ProfileImage'

type Props = {
  isAuthor: boolean
  isChatRoomMine: boolean
  participant: User
}

export const ChatParticipantItem = ({ isAuthor, isChatRoomMine, participant }: Props) => {
  const { userId, userNickname, militaryBranch } = participant

  return (
    <Container>
      <ProfileImage size="sm" iconType={militaryBranch as MilitaryBranchCode} />
      <ProfileInfo>
        <p>{userNickname}</p>
        {isAuthor && <CrownIcon />}
      </ProfileInfo>
      {isChatRoomMine && !isAuthor && <ExpelChatButton userId={userId} />}
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')};
`

const ProfileInfo = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  ${({ theme }) => theme.font(800, theme.colors.black[100])};
  flex-grow: 1;
`
