import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

import { isHttpError } from '../lib/getError'

export const CustomQueryClientProvider = ({ children }: PropsWithChildren) => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

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
            onError(error) {
              console.error(error)
              if (isHttpError(error)) {
                error.printAll()
                openModal(MODAL_KEYS.error, error.message || '예상치 못한 에러가 발생했습니다.')
              } else {
                openModal(MODAL_KEYS.error, error.message)
              }
            },
          },
        },
      }),
    [openModal],
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.error)}
        closeModal={closeModal}
        button={{ onClickButton: closeModal }}
      />
    </QueryClientProvider>
  )
}
