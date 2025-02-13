import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { EmptyMessage } from '@/components/view/Error'
import { Loading } from '@/components/view/Loading'
import type { PostResponse } from '@/types/post'
import { canJoinChatRoom } from '@/utils/canJoinChatRoom'
import { ERROR_MESSAGES } from '@/utils/constants'

type PostItemProps = {
  item: PostResponse['result'][number]
}

type PostListProps = {
  postList: PostResponse['result']
  isPending: boolean
  isError: boolean
  hasNextPage: boolean
  fetchNextPage: VoidFunction
}

const PostItem = ({ item }: PostItemProps) => {
  const { boardId, createdAt, currentPersonnel, totalPersonnel } = item.status
  const { title, trainingDate, place, time } = item.content

  return (
    <PostItemLink to={`/carpool/detail/${boardId}`}>
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
          {currentPersonnel - 1} / {totalPersonnel}
        </ParticipantsBox>
      </PostContent>
    </PostItemLink>
  )
}

export const PostList = ({
  postList,
  isPending,
  isError,
  hasNextPage,
  fetchNextPage,
}: PostListProps) => {
  if (isPending) return <Loading />
  if (isError) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />
  if (!postList || !postList.length) return <EmptyMessage label={ERROR_MESSAGES.NO_POST} />

  return (
    <PostSection>
      <InfiniteScroll
        hasMore={hasNextPage}
        threshold={200}
        loadMore={() => fetchNextPage()}
        useWindow={false}
      >
        {postList.map((item) => (
          <PostItem key={item.status.boardId} item={item} />
        ))}
      </InfiniteScroll>
    </PostSection>
  )
}

const PostItemLink = styled(Link)`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'sm')};
  ${({ theme }) => theme.padding('xl', 'md')};
  ${({ theme }) => theme.border('divider', 'bottom')};
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
    ${({ theme }) => theme.margin(0, 'xs')};
    ${({ theme }) => theme.font(900, theme.colors.black[300])};
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
  ${({ theme }) => theme.flexBox('row', undefined, undefined, 'sm')};
  ${({ theme }) => theme.font(900, theme.colors.black[400])};

  .place {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const PostSection = styled.section`
  ${({ theme }) => theme.padding(0, 'lg')};
  flex-grow: 1;
  overflow-y: scroll;
`

const ParticipantsBox = styled.div<{ $isFull: boolean }>`
  ${({ theme }) => theme.padding('sm', 'lg')};
  ${({ theme }) => theme.borderRadius('md')};
  ${({ theme }) => theme.font(800, 'white')};
  background-color: ${({ theme, $isFull }) =>
    $isFull ? theme.colors.black[300] : theme.colors.blue[500]};
`
