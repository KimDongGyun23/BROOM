import styled from 'styled-components'

export const InformationContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')}
`

export const Label = styled.p`
  ${({ theme }) => theme.font(700, theme.colors.black[600])}
`

export const Count = styled.p`
  ${({ theme }) => theme.font(700, theme.colors.blue[500])}
`
