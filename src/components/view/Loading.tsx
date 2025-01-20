import { SyncLoader } from 'react-spinners'
import styled from 'styled-components'

import theme from '@/styles/theme'

export const Loading = () => {
  return (
    <LoadingContainer>
      <SyncLoader color={theme.colors.black[600]} />
    </LoadingContainer>
  )
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
