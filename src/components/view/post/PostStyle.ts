import { styled } from 'styled-components'

export const PostContainer = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

export const FormContainer = styled.form`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container')};
  overflow-y: scroll;
`

export const GridContainer = styled.div`
  ${({ theme }) => theme.gridBox('1fr 1fr', undefined, undefined, undefined, 'lg')};
`
