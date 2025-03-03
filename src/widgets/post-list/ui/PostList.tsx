import { useEffect, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'

import type { PostListResponse } from '@/features/board/model/post.type'
import { useIsRecruiting } from '@/features/filter/model/recruiting.store'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { Loading } from '@/shared/ui/Loading'

import { PostItem } from './PostItem'

type PostListProps = {
  postList: PostListResponse['result']
  isPending: boolean
  isError: boolean
  hasNextPage: boolean
  fetchNextPage: VoidFunction
}

export const PostList = ({
  postList,
  isPending,
  isError,
  hasNextPage,
  fetchNextPage,
}: PostListProps) => {
  const isRecruiting = useIsRecruiting()
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
  if (isError) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />
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
