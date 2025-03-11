import { Link } from 'react-router-dom'
import styled from 'styled-components'

import type { PostListResponse } from '@/entities/board/model/post.type'
import { canJoinChatRoom } from '@/shared/lib/canJoinChatRoom'

type PostItemProps = {
  item: PostListResponse['result'][number]
}

export const PostItem = ({ item }: PostItemProps) => {
  const { boardId, createdAt, currentPersonnel, totalPersonnel } = item.status
  const { title, trainingDate, place, time } = item.content

  return (
    <PostItemLink to={`/board/detail/${boardId}`}>
      <PostItemHeader>
        <p className="title">{title}</p>
        <p className="date">{createdAt}</p>
      </PostItemHeader>

      <PostContent>
        <PostDetails>
          <p className="training-date">{trainingDate} 훈련</p>
          <PostLocationTime>
            <span className="place">{place}</span>
            <span>|</span>
            <span>{time}</span>
          </PostLocationTime>
        </PostDetails>

        <ParticipantsBox $isFull={!canJoinChatRoom(currentPersonnel, totalPersonnel)}>
          {currentPersonnel} / {totalPersonnel}
        </ParticipantsBox>
      </PostContent>
    </PostItemLink>
  )
}

const PostItemLink = styled(Link)`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'sm')}
    ${theme.padding('xl', 'md')}
    ${theme.border('divider', 'bottom')}
  `}
`

const PostItemHeader = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between', 'md')};

  .title {
    ${({ theme }) => theme.font(600, theme.colors.black[600])};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .date {
    ${({ theme }) => `
      ${theme.margin(0, 'xs')}
      ${theme.font(900, theme.colors.black[300])}
    `}
  }
`

const PostContent = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between', 'md')};
  text-align: left;
`

const PostDetails = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xs')};
  flex-grow: 1;
  overflow: hidden;

  .training-date {
    ${({ theme }) => theme.font(800, theme.colors.black[500])};
  }
`

const PostLocationTime = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', undefined, undefined, 'sm')}
    ${theme.font(900, theme.colors.black[400])}
  `}

  .place {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const ParticipantsBox = styled.div<{ $isFull: boolean }>`
  ${({ theme, $isFull }) => `
    ${theme.padding('sm', 'lg')}
    ${theme.borderRadius('md')}
    ${theme.font(800, 'white')}
    background-color: ${$isFull ? theme.colors.black[300] : theme.colors.blue[500]};
  `}
`
