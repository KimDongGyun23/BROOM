import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { EmptyMessage } from '@/components/view/Error'
import { AdditionCircleIcon, StopIcon } from '@/components/view/icons/NonActiveIcons'
import type { PostItemType } from '@/types/post'
import { ERROR_MESSAGES } from '@/utils/constants'

type PostItemProps = {
  item: PostItemType
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
  items: PostItemType[] | undefined
  to: string
}

export const PostList = ({ items, to }: PostListProps) => {
  if (!items || !items.length) return <EmptyMessage label={ERROR_MESSAGES.NO_POST} />

  return (
    <PostSection>
      {items.map((item) => (
        <PostItem key={item.id} item={item} to={`${to}/${item.id}`} />
      ))}
    </PostSection>
  )
}

const PostItemLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[200]};
  padding: 24px ${({ theme }) => theme.gap.lg};
`

const PostItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};

  .title {
    font-size: ${({ theme }) => theme.fontSize[600]};
    line-height: ${({ theme }) => theme.lineHeight[600]};
    color: ${({ theme }) => theme.colors.black[600]};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .date {
    font-size: ${({ theme }) => theme.fontSize[900]};
    line-height: ${({ theme }) => theme.lineHeight[900]};
    color: ${({ theme }) => theme.colors.black[300]};
  }
`

const PostContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};
  text-align: left;
`

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: ${({ theme }) => theme.gap.xs};
  overflow: hidden;

  .training-date {
    font-size: ${({ theme }) => theme.fontSize[800]};
    line-height: ${({ theme }) => theme.lineHeight[800]};
    color: ${({ theme }) => theme.colors.black[500]};
  }
`

const PostLocationTime = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap.md};
  font-size: ${({ theme }) => theme.fontSize[900]};
  line-height: ${({ theme }) => theme.lineHeight[900]};
  color: ${({ theme }) => theme.colors.black[400]};

  .place {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const PostSection = styled.section`
  flex-grow: 1;
  padding: 0 ${({ theme }) => theme.gap.xl};
  overflow-y: scroll;
`
