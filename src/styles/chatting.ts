import { styled } from 'styled-components'

export const ChattingPostTitle = styled.div`
  ${({ theme }) => theme.font(600, theme.colors.black[600])};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ChattingItemContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'lg')};
  ${({ theme }) => theme.margin(0, 'container')};
  ${({ theme }) => theme.padding(0, 0, 'lg')};
  ${({ theme }) => theme.border('divider', 'bottom')};
`

export const ChattingInformation = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'sm')};
  min-width: 0;
  flex-grow: 1;
`
