import { styled } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

export const FormContainer = styled.form<{ $isFull?: boolean }>`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container')};
  overflow-y: scroll;
  height: ${({ $isFull }) => ($isFull ? '100%' : 'fit-content')};
`

export const ValidateContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', undefined, undefined, 'lg')};
`

export const GridContainer = styled.div`
  ${({ theme }) => theme.gridBox('1fr 1fr', undefined, undefined, undefined, 'lg')};
`
