import { styled } from 'styled-components'

import { ChatInformation, ChatItemContainer, ChatPostTitle } from '@/entities/chat/ui/ChatStyle'
import type { MilitaryBranchCode } from '@/shared/lib/constants'
import { CrownIcon } from '@/shared/ui/icons/NonActiveIcons'

import { ChatProfileImageBox } from './ChatProfileImageBox'

type ChattingRoomProfileProps = {
  profileIconList: MilitaryBranchCode[]
  ownerNickname: string
  title: string
}

export const ChattingRoomProfile = ({
  profileIconList,
  ownerNickname,
  title,
}: ChattingRoomProfileProps) => (
  <ChatItemContainer>
    <ChatProfileImageBox profileIconList={profileIconList} />

    <ChatInformation>
      <ChatPostTitle>{title}</ChatPostTitle>

      <ChattingOwnerNickname>
        <span className="profile-name">{ownerNickname}</span>
        <CrownIcon />
      </ChattingOwnerNickname>
    </ChatInformation>
  </ChatItemContainer>
)

const ChattingOwnerNickname = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};

  .profile-name {
    ${({ theme }) => theme.font(800, theme.colors.black[300])};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`
