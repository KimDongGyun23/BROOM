import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import type {
  DateFilterResponse,
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
  fetchMyPostList: (pageParam: unknown) => `/mypage/board/${pageParam}`,
  fetchBookmarkList: (pageParam: unknown) => `/mypage/bookmark/${pageParam}`,
  fetchPostDetail: (urls: PostDetailRequest['urls']) => `/board/view/detail/${urls.boardId}`,
  dateTag: `/date-tag`,
} as const

export const queryKeys = {
  all: ['board'] as const,
  carpoolList: (urls: PostListRequest['urls']) =>
    [...queryKeys.all, 'list', ...Object.values(urls)] as const,
  myPostList: () => [...queryKeys.all, 'my-post'] as const,
  bookmarkList: () => [...queryKeys.all, 'bookmark'] as const,
  carpoolPostDetail: (urls: PostDetailRequest['urls']) =>
    [...queryKeys.all, 'detail', ...Object.values(urls)] as const,
  dateTag: () => [...queryKeys.all, 'date-filter'] as const,
}

export const useFetchPostList = ({ urls }: PostListRequest) =>
  useInfiniteQuery({
    queryKey: queryKeys.carpoolList(urls),
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
  useInfiniteQuery({
    queryKey: queryKeys.myPostList(),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<PostListResponse>(ENDPOINTS.fetchMyPostList(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })

export const useFetchBookmarkList = () =>
  useInfiniteQuery({
    queryKey: queryKeys.bookmarkList(),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<PostListResponse>(ENDPOINTS.fetchBookmarkList(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })

export const useFetchPostEditData = ({ urls }: PostDetailRequest) => {
  return useQuery({
    queryKey: queryKeys.carpoolPostDetail(urls),
    queryFn: () => instance.get<PostDetailResponse>(ENDPOINTS.fetchPostDetail(urls)),
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
  return useQuery({
    queryKey: queryKeys.carpoolPostDetail(urls),
    queryFn: () => instance.get<PostDetailResponse>(ENDPOINTS.fetchPostDetail(urls)),
  })
}

export const useFetchDateFilter = () => {
  return useQuery({
    queryKey: queryKeys.dateTag(),
    queryFn: () => instance.get<DateFilterResponse>(ENDPOINTS.dateTag),
  })
}
