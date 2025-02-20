import { styled } from 'styled-components'

import { CrownIcon } from '@/components/view/icons/NonActiveIcons'
import { ChattingInformation, ChattingItemContainer, ChattingPostTitle } from '@/styles/chatting'
import type { MilitaryBranchCode } from '@/utils/constants'

import { ChattingProfileImageBox } from './ChattingProfileImageBox'

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
  <ChattingItemContainer>
    <ChattingProfileImageBox profileIconList={profileIconList} />

    <ChattingInformation>
      <ChattingPostTitle>{title}</ChattingPostTitle>

      <ChattingOwnerNickname>
        <span className="profile-name">{ownerNickname}</span>
        <CrownIcon />
      </ChattingOwnerNickname>
    </ChattingInformation>
  </ChattingItemContainer>
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
