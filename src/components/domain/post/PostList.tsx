import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { EmptyMessage } from '@/components/view/Error'
import { AdditionCircleIcon, StopIcon } from '@/components/view/icons/NonActiveIcons'
import { usePostList, usePostListCurrentTab } from '@/stores/postList'
import { ERROR_MESSAGES } from '@/utils/constants'

type PostListProps = {
  hasNextPage: boolean
  fetchNextPage: VoidFunction
}

export const PostList = ({ hasNextPage, fetchNextPage }: PostListProps) => {
  const list = usePostList()
  const currentPage = usePostListCurrentTab()

  if (!list || !list.length) return <EmptyMessage label={ERROR_MESSAGES.NO_POST} />

  return (
    <PostSection>
      <InfiniteScroll
        hasMore={hasNextPage}
        threshold={200}
        loadMore={fetchNextPage}
        useWindow={false}
      >
        {list.map(({ content, status }) => (
          <PostItemLink key={status.boardId} to={`/${currentPage}/detail/${status.boardId}`}>
            <PostItemHeader>
              <p className="title">{content.title}</p>
              <p className="date">{status.createdAt}</p>
            </PostItemHeader>

            <PostContent>
              <PostDetails>
                <p className="training-date">{content.trainingDate} 훈련</p>
                <PostLocationTime>
                  <span className="place">{content.place}</span>
                  <span>|</span>
                  <span>{content.time}</span>
                </PostLocationTime>
              </PostDetails>

              <div>{status.full ? <StopIcon /> : <AdditionCircleIcon />}</div>
            </PostContent>
          </PostItemLink>
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
