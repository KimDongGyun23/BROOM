import type { ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

type ButtonSize = keyof typeof SIZE_STYLES

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: ButtonSize
  secondary?: boolean
}

export const Button = ({
  size,
  disabled = false,
  type = 'button',
  secondary = false,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton type={type} $size={size} disabled={disabled} $secondary={secondary} {...rest}>
      {children}
    </StyledButton>
  )
}

const SIZE_STYLES = {
  lg: css`
    ${({ theme }) => theme.padding('lg', 'xl')};
    ${({ theme }) => theme.font(700)};
  `,
  md: css`
    ${({ theme }) => theme.padding('lg')};
    ${({ theme }) => theme.font(800)};
  `,
  sm: css`
    ${({ theme }) => theme.padding('md')};
    ${({ theme }) => theme.font(900)};
  `,
}

const StyledButton = styled.button<{ $secondary?: boolean; $size: ButtonSize }>`
  width: auto;
  flex-shrink: 0;
  ${({ $size }) => SIZE_STYLES[$size]}
  ${({ theme }) => theme.borderRadius('md')};
  ${({ $secondary, disabled }) =>
    $secondary || disabled
      ? css`
          background-color: ${({ theme }) => theme.colors.black[100]};
          color: ${({ theme }) => theme.colors.black[500]};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.black[600]};
          color: ${({ theme }) => theme.colors.black[100]};
        `}
`
