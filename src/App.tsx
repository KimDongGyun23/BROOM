import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import styled from 'styled-components'

import { Splash } from './pages/home/Splash'
import { ErrorModal } from './shared/ui/ErrorModal'
import { RouterComponent } from './shared/ui/RouterComponent'

function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true)
  const { reset } = useQueryErrorResetBoundary()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])
  return (
    <AppContainer>
      <ErrorBoundary FallbackComponent={ErrorModal} onReset={reset}>
        <ContentWrapper>{showSplash ? <Splash /> : <RouterComponent />}</ContentWrapper>
      </ErrorBoundary>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')};
`

const ContentWrapper = styled.div`
  ${({ theme }) => theme.border('divider', 'right', 'left')}
  position: relative;
  height: 100svh;
  width: 100%;
  min-width: 320px;
  max-width: 450px;
  overflow-y: hidden;
`
