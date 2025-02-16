import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  CarpoolAddBookmarkRequest,
  CarpoolCreateRequest,
  CarpoolDeleteRequest,
  CarpoolDetailRequest,
  CarpoolDetailResponse,
  CarpoolEditRequest,
  CarpoolForm,
  CarpoolId,
  CarpoolListResponse,
  CarpoolMainRequest,
  CarpoolRemoveBookmarkRequest,
  CarpoolSearchRequest,
} from '@/types/post'

import { instance } from '.'

const ENDPOINTS = {
  fetchCarpoolList: (urls: CarpoolMainRequest['urls']) =>
    `/board/view/all/${urls.pageParam}?recruiting=${urls.isAllShow}`,
  fetchSearchList: (urls: CarpoolSearchRequest['urls']) =>
    `/board/search/${urls.pageParam}?type=${urls.type}&keyword=${urls.keyword}&recruiting=${urls.isAllShow}`,
  fetchMyCarpoolList: (pageParam: unknown) => `/mypage/board/${pageParam}`,
  fetchBookmarkList: (pageParam: unknown) => `/mypage/bookmark/${pageParam}`,
  fetchCarpoolDetail: (urls: CarpoolDetailRequest['urls']) => `/board/view/${urls.boardId}`,

  createCarpoolPost: '/board',
  editCarpoolPost: (urls: CarpoolDetailRequest['urls']) => `/board/${urls.boardId}`,
  deleteCarpoolPost: (urls: CarpoolDeleteRequest['urls']) => `/board/${urls.boardId}`,
  addBookmark: `/mypage/bookmark`,
  removeBookmark: (urls: CarpoolRemoveBookmarkRequest['urls']) =>
    `/mypage/bookmark/${urls.boardId}`,
} as const

const queryKeys = {
  all: ['carpool'] as const,
  carpoolList: (urls: CarpoolMainRequest['urls']) =>
    [...queryKeys.all, 'list', ...Object.values(urls)] as const,
  searchList: (urls: CarpoolSearchRequest['urls']) =>
    [...queryKeys.all, 'search', ...Object.values(urls)] as const,
  myPost: () => [...queryKeys.all, 'my-post'] as const,
  bookmark: () => [...queryKeys.all, 'bookmark'] as const,
  carpoolDetail: (urls: CarpoolDetailRequest['urls']) =>
    [...queryKeys.all, 'detail', ...Object.values(urls)] as const,
}

export const useFetchCarpoolList = ({ urls }: CarpoolMainRequest) =>
  useInfiniteQuery({
    queryKey: queryKeys.carpoolList(urls),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<CarpoolListResponse>(ENDPOINTS.fetchCarpoolList({ ...urls, pageParam })),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })

export const useFetchCarpoolSearchList = ({ urls }: CarpoolSearchRequest) =>
  useInfiniteQuery({
    queryKey: queryKeys.searchList(urls),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<CarpoolListResponse>(ENDPOINTS.fetchSearchList({ ...urls, pageParam })),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })

export const useFetchMyPostList = () =>
  useInfiniteQuery({
    queryKey: queryKeys.myPost(),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<CarpoolListResponse>(ENDPOINTS.fetchMyCarpoolList(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })

export const useFetchBookmarkList = () =>
  useInfiniteQuery({
    queryKey: queryKeys.bookmark(),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<CarpoolListResponse>(ENDPOINTS.fetchBookmarkList(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })

export const useFetchCarpoolDetail = ({ urls }: CarpoolDetailRequest) => {
  return useQuery({
    queryKey: queryKeys.carpoolDetail(urls),
    queryFn: () => instance.get<CarpoolDetailResponse>(ENDPOINTS.fetchCarpoolDetail(urls)),
  })
}

export const useCreateCarpoolPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: CarpoolCreateRequest) =>
      instance.post<CarpoolId>(ENDPOINTS.createCarpoolPost, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useEditCarpoolPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body, urls }: CarpoolEditRequest) =>
      instance.patch<CarpoolId>(ENDPOINTS.editCarpoolPost(urls), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useFetchUpdatePostData = ({ urls }: CarpoolDetailRequest) => {
  return useQuery({
    queryKey: queryKeys.carpoolDetail(urls),
    queryFn: () => instance.get<CarpoolDetailResponse>(ENDPOINTS.fetchCarpoolDetail(urls)),
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

export const useDeleteCarpoolPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ urls }: CarpoolDeleteRequest) =>
      instance.delete<string>(ENDPOINTS.deleteCarpoolPost(urls)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useAddBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: CarpoolAddBookmarkRequest) => instance.post(ENDPOINTS.addBookmark, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ urls }: CarpoolRemoveBookmarkRequest) =>
      instance.delete(ENDPOINTS.removeBookmark(urls)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
