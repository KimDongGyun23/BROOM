import { useMutation, useQueryClient } from '@tanstack/react-query'

import { instance } from '@/app/api'
import { mypageQueryKeys } from '@/entities/mypage/api/useMypage.query'
import type { UpdateAccountInformationRequest } from '@/entities/mypage/model/mypage.type'

export const useEditAccountInformationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: UpdateAccountInformationRequest) =>
      instance.put<string>('/mypage/info', body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: mypageQueryKeys.all }),
  })
}
