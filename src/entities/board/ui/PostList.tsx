import { useEffect, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'

import type { PostListResponse } from '@/entities/board/model/post.type'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { Loading } from '@/shared/ui/Loading'

import { PostItem } from './PostItem'

type PostListProps = {
  isPending?: boolean
  isRecruiting?: boolean
  postList: PostListResponse['result']
  hasNextPage: boolean
  fetchNextPage: VoidFunction
}

export const PostList = ({
  isPending = false,
  isRecruiting = false,
  postList,
  hasNextPage,
  fetchNextPage,
}: PostListProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [isRecruiting])

  if (isPending) return <Loading />
  if (!postList || !postList.length) return <EmptyMessage label={ERROR_MESSAGES.NO_POST} />

  return (
    <PostSection ref={scrollRef}>
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

const PostSection = styled.section`
  ${({ theme }) => theme.padding(0, 'lg')};
  flex-grow: 1;
  overflow-y: scroll;
`
