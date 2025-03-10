import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

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
              openModal(MODAL_KEYS.error, error.message)
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
