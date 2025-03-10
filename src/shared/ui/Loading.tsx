import { SyncLoader } from 'react-spinners'
import styled from 'styled-components'

import theme from '@/app/style/theme'

type LoadingProps = {
  isFull?: boolean
}

export const Loading = ({ isFull = false }: LoadingProps) => {
  return (
    <LoadingContainer $isFull={isFull}>
      <SyncLoader color={theme.colors.black[600]} />
    </LoadingContainer>
  )
}

const LoadingContainer = styled.div<{ $isFull: boolean }>`
  ${({ theme, $isFull }) => `
    ${theme.flexBox('row', 'center', 'center')}
    height: ${$isFull ? '100svh' : '100%'};
  `}
  width: 100%;
`
