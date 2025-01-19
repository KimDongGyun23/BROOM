import styled from 'styled-components'

const StyledEmptyMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize[700]};
  line-height: ${({ theme }) => theme.lineHeight[700]};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.gap.xxl};
  color: ${({ theme }) => theme.colors.black[500]};
`

type EmptyMessageProps = {
  label: string
}

export const EmptyMessage = ({ label }: EmptyMessageProps) => {
  return <StyledEmptyMessage>{label}</StyledEmptyMessage>
}
