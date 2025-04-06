import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useModalActions } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const CustomQueryClientProvider = ({ children }: PropsWithChildren) => {
  const { openModal, closeModal } = useModalActions()

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retryOnMount: true,
            refetchOnReconnect: false,
            throwOnError: true,
            retry: 0,
          },
          mutations: {
            onError: (error) => {
              const axiosError = error as AxiosError<string>
              const errorMessage = axiosError.response?.data || '알 수 없는 오류가 발생했습니다.'
              openModal(MODAL_KEYS.ERROR, errorMessage)
            },
          },
        },
      }),
    [openModal],
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ModalWithOneButton modalKey={MODAL_KEYS.ERROR} button={{ onClickButton: closeModal }} />
    </QueryClientProvider>
  )
}
