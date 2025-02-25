import { SyncLoader } from 'react-spinners'
import styled from 'styled-components'

import theme from '@/app/style/theme'

export const Loading = () => {
  return (
    <LoadingContainer>
      <SyncLoader color={theme.colors.black[600]} />
    </LoadingContainer>
  )
}

const LoadingContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')};
  width: 100%;
  height: 100%;
`
