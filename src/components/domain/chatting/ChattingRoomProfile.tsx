import { styled } from 'styled-components'

import { CrownIcon } from '@/components/view/icons/NonActiveIcons'
import { ChatInformation, ChatItemContainer, ChatPostTitle } from '@/styles/chatting'
import type { MilitaryBranchCode } from '@/utils/constants'

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
