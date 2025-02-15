import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

import type {
  CarpoolCreateRequest,
  CarpoolEditRequest,
  CarpoolForm,
  CarpoolSearchRequest,
  PostDeleteBookmarkRequest,
  PostDeleteRequest,
  PostDetailRequest,
  PostDetailResponse,
  PostId,
  PostRequest,
  PostResponse,
  PostSetBookmarkRequest,
} from '@/types/post'

import { instance } from '.'

const ENDPOINTS = {
  fetchCarpoolList: (urls: PostRequest['urls']) =>
    `/board/view/all/${urls.pageParam}?recruiting=${urls.isAllShow}`,
  fetchSearchList: (urls: CarpoolSearchRequest['urls']) =>
    `/board/search/${urls.pageParam}?type=${urls.type}&keyword=${urls.keyword}&recruiting=${urls.isAllShow}`,
  myPost: (pageParam: unknown) => `/mypage/board/${pageParam}`,
  bookmark: (pageParam: unknown) => `/mypage/bookmark/${pageParam}`,

  createCarpoolPost: '/board',
  editCarpoolPost: (urls: PostDetailRequest['urls']) => `/board/${urls.boardId}`,
  detail: (urls: PostDetailRequest['urls']) => `/board/view/${urls.boardId}`,
  delete: (urls: PostDeleteRequest['urls']) => `/board/${urls.boardId}`,
  setBookmark: `/mypage/bookmark`,
  deleteBookmark: (urls: PostDeleteBookmarkRequest['urls']) => `/mypage/bookmark/${urls.boardId}`,
} as const

const queryKeys = {
  all: ['carpool'] as const,
  carpoolList: (urls: PostRequest['urls']) =>
    [...queryKeys.all, 'list', ...Object.values(urls)] as const,
  searchList: (urls: CarpoolSearchRequest['urls']) =>
    [...queryKeys.all, 'search', ...Object.values(urls)] as const,
  myPost: () => [...queryKeys.all, 'my-post'] as const,
  bookmark: () => [...queryKeys.all, 'bookmark'] as const,
  detail: (boardId: string) => [...queryKeys.all, 'detail', boardId] as const,
}

export const useFetchCarpoolList = ({ urls }: PostRequest) =>
  useInfiniteQuery({
    queryKey: queryKeys.carpoolList(urls),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<PostResponse>(ENDPOINTS.fetchCarpoolList({ ...urls, pageParam })),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })

export const useFetchCarpoolSearchList = ({ urls }: CarpoolSearchRequest) =>
  useInfiniteQuery({
    queryKey: queryKeys.searchList(urls),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<PostResponse>(ENDPOINTS.fetchSearchList({ ...urls, pageParam })),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })

export const useFetchMyPostList = () =>
  useInfiniteQuery({
    queryKey: queryKeys.myPost(),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<PostResponse>(ENDPOINTS.myPost(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })

export const useFetchBookmarkList = () =>
  useInfiniteQuery({
    queryKey: queryKeys.bookmark(),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<PostResponse>(ENDPOINTS.bookmark(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })

export const usePostDetail = ({ urls }: PostDetailRequest) => {
  return useQuery<PostDetailResponse>({
    queryKey: queryKeys.detail(urls.boardId),
    queryFn: async () => await instance.get(ENDPOINTS.detail(urls)),
  })
}

export const useCreateCarpoolPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: CarpoolCreateRequest) =>
      instance.post<PostId>(ENDPOINTS.createCarpoolPost, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useEditCarpoolPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body, urls }: CarpoolEditRequest) =>
      instance.patch<PostId>(ENDPOINTS.editCarpoolPost(urls), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useFetchUpdatePostData = ({ urls }: PostDetailRequest) => {
  return useQuery<PostDetailResponse, Error, CarpoolForm>({
    queryKey: queryKeys.detail(urls.boardId),
    queryFn: async () => await instance.get(ENDPOINTS.detail(urls)),
    select: (data): CarpoolForm => {
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

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<string>, AxiosError<string>, PostDeleteRequest>({
    mutationFn: async ({ urls }) => await instance.delete(ENDPOINTS.delete(urls)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useSetBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostSetBookmarkRequest>({
    mutationFn: async ({ body }) => await instance.post(ENDPOINTS.setBookmark, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostDeleteBookmarkRequest>({
    mutationFn: async ({ urls }) => await instance.delete(ENDPOINTS.deleteBookmark(urls)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
