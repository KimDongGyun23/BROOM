import styled from 'styled-components'

import { ProfileImage } from '@/components/view/ProfileImage'
import type { MilitaryBranchCode } from '@/utils/constants'

type ChattingProfileProps = {
  iconType: MilitaryBranchCode
  opponent: string
  title: string
  lastMessage: string
  lastMessageDaysAgo: string
}

export const ChattingItem = ({
  iconType,
  opponent,
  title,
  lastMessage,
  lastMessageDaysAgo,
}: ChattingProfileProps) => (
  <ChattingProfileContainer>
    <ProfileImage iconType={iconType} size="lg" />
    <ChattingProfileInfo>
      <NameSubtitleContainer>
        <h6 className="opponent-name">{opponent}</h6>
        <p className="title">{title}</p>
      </NameSubtitleContainer>
      <LastMessage>{lastMessage}</LastMessage>
    </ChattingProfileInfo>
    <LastMessageTime>{lastMessageDaysAgo}</LastMessageTime>
  </ChattingProfileContainer>
)

const ChattingProfileContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.xl)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[100]};
  padding: 0 ${({ theme }) => `${theme.gap.xl} ${theme.gap.lg}`};
  border-bottom-color: ${({ theme }) => theme.colors.black[200]};
  width: 100%;
`

const ChattingProfileInfo = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, theme.gap.sm)};
  min-width: 0;
  flex-grow: 1;
`

const NameSubtitleContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.lg)};

  .opponent-name {
    flex-shrink: 0;
  }

  .title {
    min-width: 0;
    overflow: hidden;
    font-size: ${({ theme }) => theme.fontSize[900]};
    line-height: ${({ theme }) => theme.lineHeight[900]};
    color: ${({ theme }) => theme.colors.blue[500]};
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const LastMessage = styled.p`
  min-width: 0;
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize[900]};
  line-height: ${({ theme }) => theme.lineHeight[900]};
  color: ${({ theme }) => theme.colors.black[700]};
  text-overflow: ellipsis;
  white-space: nowrap;
`

const LastMessageTime = styled.p`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${({ theme }) => theme.fontSize[900]};
  line-height: ${({ theme }) => theme.lineHeight[900]};
  color: ${({ theme }) => theme.colors.black[500]};
`
