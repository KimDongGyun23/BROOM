import { styled } from 'styled-components'

import { ChatProfileImageBox } from '@/entities/chat/ui/ChatProfileImageBox'
import { ChatInformation, ChatItemContainer, ChatPostTitle } from '@/entities/chat/ui/ChatStyle'
import { CrownIcon } from '@/shared/ui/icons/NonActiveIcons'

import { useChatRoomData } from '../model/useChatRoomData'

export const ChattingRoomProfile = () => {
  const { militaryBranches, ownerNickname, boardTitle } = useChatRoomData()

  return (
    <ChatItemContainer>
      <ChatProfileImageBox profileIconList={militaryBranches} />

      <ChatInformation>
        <ChatPostTitle>{boardTitle}</ChatPostTitle>

        <ChattingOwnerNickname>
          <span className="profile-name">{ownerNickname}</span>
          <CrownIcon />
        </ChattingOwnerNickname>
      </ChatInformation>
    </ChatItemContainer>
  )
}

const ChattingOwnerNickname = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};

  .profile-name {
    ${({ theme }) => theme.font(800, theme.colors.black[300])};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`
