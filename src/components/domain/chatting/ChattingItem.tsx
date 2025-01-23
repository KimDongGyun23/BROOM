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
  <Container>
    <ProfileImage iconType={iconType} size="lg" />
    <ChattingProfileInfo>
      <NameSubtitleContainer>
        <h6 className="opponent-name">{opponent}</h6>
        <p className="title">{title}</p>
      </NameSubtitleContainer>
      <LastMessage>{lastMessage}</LastMessage>
    </ChattingProfileInfo>

    <LastMessageTime>{lastMessageDaysAgo}</LastMessageTime>
  </Container>
)

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'lg')};
  ${({ theme }) => theme.padding('lg', 'md')};
  ${({ theme }) => theme.border('divider', 'bottom')};
  width: 100%;
`

const ChattingProfileInfo = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'sm')};
  min-width: 0;
  flex-grow: 1;
`

const NameSubtitleContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'md')};

  .opponent-name {
    flex-shrink: 0;
  }

  .title {
    min-width: 0;
    overflow: hidden;
    ${({ theme }) => theme.font(900, theme.colors.blue[500])};
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const LastMessage = styled.p`
  ${({ theme }) => theme.font(900, theme.colors.black[700])};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const LastMessageTime = styled.p`
  ${({ theme }) => theme.margin(0, 0, 0, 'auto')};
  ${({ theme }) => theme.font(900, theme.colors.black[500])};
  flex-shrink: 0;
`
