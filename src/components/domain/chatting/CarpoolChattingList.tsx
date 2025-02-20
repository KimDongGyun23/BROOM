import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

import type { MilitaryBranchCode } from '@/utils/constants'

import { ChattingProfileImageBox } from './ChattingProfileImageBox'

type ChattingProfileProps = {
  boardName: string
  lastMessage: string
  lastMessageTime: string
  militaryBranches: MilitaryBranchCode[]
  expelled: boolean
}

const ChattingItem = ({
  boardName,
  lastMessage,
  lastMessageTime,
  militaryBranches,
  expelled,
}: ChattingProfileProps) => (
  <ChattingItemContainer>
    <ChattingProfileImageBox profileIconList={militaryBranches} />
    <ChattingInformation>
      <ChattingPostTitle>{boardName}</ChattingPostTitle>
      <LastMessage $expelled={expelled}>
        {expelled ? '방장에 의해 내보내졌습니다.' : lastMessage}
      </LastMessage>
    </ChattingInformation>

    {!expelled && <LastMessageTime>{lastMessageTime}</LastMessageTime>}
  </ChattingItemContainer>
)

export const CarpoolChattingList = () => {
  const { data: chattingList, isPending, isError } = useCarpoolChattingRoomList()

  if (isPending) return <Loading />
  if (isError) return <div>error</div>

  return (
    <ChattingListContainer>
      {chattingList.map((chattingRoomInformation) => (
        <Link
          key={chattingRoomInformation.boardId}
          to={`/chatting/chatting-room/${chattingRoomInformation.boardId}`}
        >
          <ChattingItem {...chattingRoomInformation} />
        </Link>
      ))}
    </ChattingListContainer>
  )
}

const ChattingListContainer = styled.main`
  ${({ theme }) => theme.flexBox('column')};
  ${({ theme }) => theme.margin('container', 0)};
  flex-grow: 1;
  overflow-y: scroll;
`

const ChattingItemContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'lg')};
  ${({ theme }) => theme.padding('lg', 'md')};
  ${({ theme }) => theme.border('divider', 'bottom')};
  width: 100%;
`

const ChattingInformation = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'sm')};
  min-width: 0;
  flex-grow: 1;
`

const ChattingPostTitle = styled.div`
  ${({ theme }) => theme.font(600, theme.colors.black[600])};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const LastMessage = styled.p<{ $expelled?: boolean }>`
  ${({ theme, $expelled }) =>
    theme.font(800, $expelled ? theme.colors.orange : theme.colors.black[300])};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const LastMessageTime = styled.p`
  ${({ theme }) => theme.margin(0, 0, 0, 'auto')};
  ${({ theme }) => theme.font(800, theme.colors.black[300])};
  flex-shrink: 0;
`
