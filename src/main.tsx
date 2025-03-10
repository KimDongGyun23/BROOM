import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { ThemeProvider } from 'styled-components'

import { CustomQueryClientProvider } from './app/provider/CustomQueryClientProvider.tsx'
import GlobalStyles from './app/style/globalStyles.ts'
import theme from './app/style/theme.ts'
import { ErrorFallback } from './shared/ui/ErrorFallback.tsx'
import { Loading } from './shared/ui/Loading.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CustomQueryClientProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loading isFull />}>
            <GlobalStyles />
            <App />
            <Analytics />
            <SpeedInsights />
          </Suspense>
        </ErrorBoundary>
      </CustomQueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>,
)
