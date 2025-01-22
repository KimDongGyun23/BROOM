import styled from 'styled-components'

export const MessageBoxForm = styled.form`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'md')};
  ${({ theme }) => theme.padding('md', 'lg', 'xxl', 'lg')};
  background-color: white;
`

export const MessageInputContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  ${({ theme }) => theme.borderRadius('full')};
  ${({ theme }) => theme.padding('sm', 'sm', 'sm', 'lg')};
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.black[100]};

  .message-button {
    flex-shrink: 0;
  }
`

export const MessageInput = styled.input`
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
  flex-grow: 1;
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.black[300]};
  }

  &:focus {
    outline: none;
  }
`
