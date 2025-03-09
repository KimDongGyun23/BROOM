import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const CustomQueryClientProvider = ({ children }: PropsWithChildren) => {
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
            throwOnError: true,
          },
        },
      }),
    [],
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
