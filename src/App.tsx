import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Splash } from './components/container/home/Splash'
import { RouterComponent } from './components/view/RouterComponent'

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContentWrapper = styled.div`
  position: relative;
  height: 100svh;
  width: 100%;
  min-width: 320px;
  max-width: 450px;
  border-left: 1px solid ${({ theme }) => theme.colors.black[100]};
  border-right: 1px solid ${({ theme }) => theme.colors.black[100]};
  overflow-y: scroll;
`

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
