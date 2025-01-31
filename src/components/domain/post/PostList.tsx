import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { EmptyMessage } from '@/components/view/Error'
import { AdditionCircleIcon, StopIcon } from '@/components/view/icons/NonActiveIcons'
import type { PostSummary } from '@/types/post'
import type { TabKey } from '@/utils/constants'
import { ERROR_MESSAGES } from '@/utils/constants'

type PostItemProps = {
  item: PostSummary
  to: string
}

const PostItem = ({ item, to }: PostItemProps) => {
  const { title, createdAt, trainingDate, place, time, full } = item

  return (
    <PostItemLink to={to}>
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

        <div>{full ? <StopIcon /> : <AdditionCircleIcon />}</div>
      </PostContent>
    </PostItemLink>
  )
}

type PostListProps = {
  items: PostSummary[] | undefined
  currentPage: TabKey
}

export const PostList = ({ items, currentPage }: PostListProps) => {
  if (!items || !items.length) return <EmptyMessage label={ERROR_MESSAGES.NO_POST} />

  return (
    <PostSection>
      {items.map((item) => (
        <PostItem key={item.boardId} item={item} to={`/${currentPage}/detail/${item.boardId}`} />
      ))}
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
