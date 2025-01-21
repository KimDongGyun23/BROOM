import styled from 'styled-components'

export const MessageBoxForm = styled.form`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.md)};
  background-color: white;
  padding: ${({ theme }) => `${theme.gap.lg} ${theme.gap.xl}`} 32px;
`

export const MessageInputContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.xs)};
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.black[100]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => `${theme.gap.md} ${theme.gap.md} ${theme.gap.md} ${theme.gap.xl}`};

  .message-button {
    flex-shrink: 0;
  }
`

export const MessageInput = styled.input`
  flex-grow: 1;
  background: transparent;
  ${({ theme }) => theme.font(800, theme.colors.black[500])};

  &::placeholder {
    color: ${({ theme }) => theme.colors.black[300]};
  }

  &:focus {
    outline: none;
  }
`
