import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import type {
  BoardMainRequest,
  PostDetailRequest,
  PostDetailResponse,
  PostForm,
  PostListResponse,
  PostSearchRequest,
} from '@/features/board/model/post.type'

import { instance } from '../../../app/api'

const ENDPOINTS = {
  fetchPostList: (urls: BoardMainRequest['urls']) =>
    `/board/view/all/${urls.pageParam}?recruiting=${urls.recruiting}`,
  fetchSearchPostList: (urls: PostSearchRequest['urls']) =>
    `/board/search/${urls.pageParam}?type=${urls.type}&keyword=${urls.keyword}&recruiting=${urls.recruiting}`,
  fetchMyPostList: (pageParam: unknown) => `/mypage/board/${pageParam}`,
  fetchBookmarkList: (pageParam: unknown) => `/mypage/bookmark/${pageParam}`,
  fetchPostDetail: (urls: PostDetailRequest['urls']) => `/board/view/${urls.boardId}`,
} as const

export const queryKeys = {
  all: ['carpool'] as const,
  carpoolList: (urls: BoardMainRequest['urls']) =>
    [...queryKeys.all, 'list', ...Object.values(urls)] as const,
  searchList: (urls: PostSearchRequest['urls']) =>
    [...queryKeys.all, 'search', ...Object.values(urls)] as const,
  myPostList: () => [...queryKeys.all, 'my-post'] as const,
  bookmarkList: () => [...queryKeys.all, 'bookmark'] as const,
  carpoolPostDetail: (urls: PostDetailRequest['urls']) =>
    [...queryKeys.all, 'detail', ...Object.values(urls)] as const,
}

export const useFetchPostList = ({ urls }: BoardMainRequest) =>
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

export const useFetchPostSearchList = ({ urls }: PostSearchRequest) =>
  useInfiniteQuery({
    queryKey: queryKeys.searchList(urls),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<PostListResponse>(ENDPOINTS.fetchSearchPostList({ ...urls, pageParam })),
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
