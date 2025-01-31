import { styled } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

export const FormContainer = styled.form`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container')};
  overflow-y: scroll;
`
