import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { ThemeProvider } from 'styled-components'

import { CustomQueryClientProvider } from './app/provider/CustomQueryClientProvider.tsx'
import GlobalStyles from './app/style/globalStyles.ts'
import theme from './app/style/theme.ts'
import { Loading } from './shared/ui/Loading.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CustomQueryClientProvider>
        <Suspense fallback={<Loading />}>
          <GlobalStyles />
          <App />
          <Analytics />
          <SpeedInsights />
        </Suspense>
        <ReactQueryDevtools />
      </CustomQueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>,
)
