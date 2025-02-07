import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  PostCreateRequest,
  PostDeleteBookmarkRequest,
  PostDeleteRequest,
  PostDetailRequest,
  PostDetailResponse,
  PostEditRequest,
  PostForm,
  PostId,
  PostIsFullRequest,
  PostRequest,
  PostResponse,
  PostSearchRequest,
  PostSetBookmarkRequest,
} from '@/types/post'

import { instance } from '.'

const API_ENDPOINTS = {
  list: (urls: PostRequest['urls']) =>
    `/board/view/all/${urls.pageParam}?category=${urls.category}&isFull=${urls.isAllShow}`,
  search: (urls: PostSearchRequest['urls']) =>
    `/board/search/${urls.pageParam}?category=${urls.category}&type=${urls.type}&keyword=${urls.keyword}&isFull=${urls.isAllShow}`,

  create: '/board',
  edit: (urls: PostDetailRequest['urls']) => `/board/${urls.boardId}`,
  detail: (urls: PostDetailRequest['urls']) => `/board/view/${urls.boardId}`,
  delete: (urls: PostDeleteRequest['urls']) => `/board/${urls.boardId}`,
  markIsFull: (urls: PostIsFullRequest['urls']) => `/board/check/${urls.boardId}`,
  setBookmark: `/mypage/bookmark`,
  deleteBookmark: (urls: PostDeleteBookmarkRequest['urls']) => `/mypage/bookmark/${urls.boardId}`,
} as const

const queryKeys = {
  all: ['post'] as const,
  list: (urls: PostRequest['urls']) => [...queryKeys.all, 'list', ...Object.values(urls)] as const,
  search: (urls: Omit<PostSearchRequest, 'pageParam'>['urls']) =>
    [...queryKeys.all, 'search', ...Object.values(urls)] as const,
  detail: (boardId: string) => [...queryKeys.all, 'detail', boardId] as const,
}

export const usePostList = ({ urls }: PostRequest) => {
  return useInfiniteQuery<PostResponse, Error>({
    queryKey: queryKeys.list({ ...urls }),
    queryFn: async ({ pageParam = 0 }: { pageParam: unknown }) =>
      await instance.get(API_ENDPOINTS.list({ ...urls, pageParam })),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.result.length + 1 : undefined
    },
  })
}

export const useSearchPostList = ({ urls }: PostSearchRequest) => {
  return useInfiniteQuery<PostResponse, Error>({
    queryKey: queryKeys.search({ ...urls }),
    queryFn: async ({ pageParam = 0 }: { pageParam: unknown }) =>
      await instance.get(API_ENDPOINTS.search({ ...urls, pageParam })),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.result.length + 1 : undefined
    },
  })
}

export const usePostDetail = ({ urls }: PostDetailRequest) => {
  return useQuery<PostDetailResponse>({
    queryKey: queryKeys.detail(urls.boardId),
    queryFn: async () => await instance.get(API_ENDPOINTS.detail(urls)),
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation<PostId, Error, PostCreateRequest>({
    mutationFn: async ({ body }) => await instance.post(API_ENDPOINTS.create, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation<PostId, Error, PostEditRequest>({
    mutationFn: async ({ body, urls }) => await instance.patch(API_ENDPOINTS.edit(urls), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useFetchUpdatePostData = ({ urls }: PostDetailRequest) => {
  return useQuery<PostDetailResponse, Error, PostForm>({
    queryKey: queryKeys.detail(urls.boardId),
    queryFn: async () => await instance.get(API_ENDPOINTS.detail(urls)),
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

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostDeleteRequest>({
    mutationFn: async ({ urls }) => await instance.delete(API_ENDPOINTS.delete(urls)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useMarkPostAsFull = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, PostIsFullRequest>({
    mutationFn: async ({ body, urls }) =>
      await instance.patch(API_ENDPOINTS.markIsFull(urls), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useSetBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostSetBookmarkRequest>({
    mutationFn: async ({ body }) => await instance.post(API_ENDPOINTS.setBookmark, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostDeleteBookmarkRequest>({
    mutationFn: async ({ urls }) => await instance.delete(API_ENDPOINTS.deleteBookmark(urls)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
