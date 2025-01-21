import type { ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

import theme from '@/styles/theme'

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
    padding: ${theme.gap.xl} ${theme.gap.xxl};
    ${theme.font(700)};
  `,
  md: css`
    padding: ${theme.gap.xl} ${theme.gap.xl};
    ${theme.font(800)};
  `,
  sm: css`
    padding: ${theme.gap.lg} ${theme.gap.lg};
    ${theme.font(900)};
  `,
}

const StyledButton = styled.button<{ $secondary?: boolean; $size: ButtonSize }>`
  border-radius: ${theme.borderRadius.lg};
  width: auto;
  flex-shrink: 0;
  ${({ $size }) => SIZE_STYLES[$size]}
  ${({ $secondary, disabled }) =>
    $secondary || disabled
      ? css`
          background-color: ${theme.colors.black[100]};
          color: ${theme.colors.black[500]};
        `
      : css`
          background-color: ${theme.colors.black[600]};
          color: ${theme.colors.black[100]};
        `}
`
