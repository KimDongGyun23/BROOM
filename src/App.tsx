import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Splash } from './pages/home/Splash'
import { RouterComponent } from './shared/ui/RouterComponent'

function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])
  return (
    <AppContainer>
      <ContentWrapper>{showSplash ? <Splash /> : <RouterComponent />}</ContentWrapper>
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
