import styled from 'styled-components'

type EmptyMessageProps = {
  label: string
}

export const EmptyMessage = ({ label }: EmptyMessageProps) => {
  return <StyledEmptyMessage>{label}</StyledEmptyMessage>
}

const StyledEmptyMessage = styled.p`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', 'center')};
    ${theme.padding('3xl')};
    ${theme.font(700, theme.colors.black[500])};
  `}
  width: 100%;
  height: 100%;
  white-space: pre;
  text-align: center;
`
