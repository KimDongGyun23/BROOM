import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'

import type {
  PostDetailRequest,
  PostDetailResponse,
  PostForm,
  PostListRequest,
  PostListResponse,
} from '@/entities/board/model/post.type'

import { instance } from '../../../app/api'

const ENDPOINTS = {
  fetchPostList: (urls: PostListRequest['urls']) => {
    const baseUrl = `/board/view/${urls.pageParam}`
    const searchParams = new URLSearchParams()

    if (urls.title) searchParams.append('title', urls.title)
    if (urls.place) searchParams.append('place', urls.place)
    if (urls.trainingDate) searchParams.append('trainingDate', urls.trainingDate)
    if (urls.recruiting !== undefined) searchParams.append('recruiting', urls.recruiting.toString())

    const queryString = searchParams.toString()
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  },
} as const

export const boardQueryKeys = {
  all: ['board'] as const,
  myPostList: () => [...boardQueryKeys.all, 'my-post'] as const,
  bookmarkList: () => [...boardQueryKeys.all, 'bookmark'] as const,
  carpoolList: (urls: PostListRequest['urls']) =>
    [...boardQueryKeys.all, 'list', ...Object.values(urls)] as const,
  carpoolPostDetail: (urls: PostDetailRequest['urls']) =>
    [...boardQueryKeys.all, 'detail', ...Object.values(urls)] as const,
}

export const useFetchPostList = ({ urls }: PostListRequest) =>
  useSuspenseInfiniteQuery({
    queryKey: boardQueryKeys.carpoolList(urls),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<PostListResponse>(ENDPOINTS.fetchPostList({ ...urls, pageParam })),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
    gcTime: 0,
    staleTime: 0,
  })

export const useFetchMyPostList = () =>
  useSuspenseInfiniteQuery({
    queryKey: boardQueryKeys.myPostList(),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<PostListResponse>(`/mypage/board/${pageParam}`),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.hasNext ? allPages.length : undefined),
  })

export const useFetchBookmarkList = () =>
  useSuspenseInfiniteQuery({
    queryKey: boardQueryKeys.bookmarkList(),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<PostListResponse>(`/mypage/bookmark/${pageParam}`),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.hasNext ? allPages.length : undefined),
  })

export const useFetchPostEditData = ({ urls }: PostDetailRequest) => {
  return useSuspenseQuery({
    queryKey: boardQueryKeys.carpoolPostDetail(urls),
    queryFn: () => instance.get<PostDetailResponse>(`/board/view/detail/${urls.boardId}`),
    select: (data): PostForm => {
      const { title, trainingDate, place, content, time, personnel } = data.contentDetail
      const [hour, minute] = time.split(':')
      return {
        title,
        trainingDate,
        place,
        content,
        hour,
        minute,
        personnel: personnel.toString(),
      }
    },
  })
}

export const useFetchPostDetail = ({ urls }: PostDetailRequest) => {
  return useSuspenseQuery({
    queryKey: boardQueryKeys.carpoolPostDetail(urls),
    queryFn: () => instance.get<PostDetailResponse>(`/board/view/detail/${urls.boardId}`),
  })
}
