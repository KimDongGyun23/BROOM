import { styled } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

export const FlexColumnContainer = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

export const ScrollContainer = styled.div`
  ${({ theme }) => theme.margin('container', 0)};
  flex-grow: 1;
  overflow-y: scroll;
`

export const FormContainer = styled.form<{ $isFull?: boolean }>`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container')};
  overflow-y: scroll;
  height: ${({ $isFull }) => ($isFull ? '100%' : 'fit-content')};
`

export const GridContainer = styled.div`
  ${({ theme }) => theme.gridBox('1fr 1fr', undefined, undefined, undefined, 'lg')};
`

export const AdminInformationContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')}
`

export const AdminLabel = styled.p`
  ${({ theme }) => theme.font(700, theme.colors.black[600])}
`

export const AdminCount = styled.p`
  ${({ theme }) => theme.font(700, theme.colors.blue[500])}
`
