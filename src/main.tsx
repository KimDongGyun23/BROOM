import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from './styles/globalStyles.ts'
import theme from './styles/theme.ts'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryOnMount: true,
      refetchOnReconnect: false,
      retry: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>,
)
