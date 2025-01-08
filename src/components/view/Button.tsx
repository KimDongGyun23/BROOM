import type { ButtonHTMLAttributes } from 'react'

const SIZE_STYLES = {
  lg: 'px-5 py-4 p-medium',
  md: 'px-4 py-[15px] p-small',
  sm: 'px-3 py-[14px] p-xsmall',
} as const

type ButtonSize = keyof typeof SIZE_STYLES

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: ButtonSize
  secondary?: boolean
  className?: string
}

export const Button = ({
  size,
  className = '',
  disabled = false,
  type = 'button',
  secondary = false,
  children,
  ...rest
}: ButtonProps) => {
  const sizeStyle = SIZE_STYLES[size]
  const variantStyle =
    secondary || disabled ? 'bg-grey-200 text-grey-500' : 'bg-blue-500 text-grey-100'

  const buttonStyle = `font-bold rounded-xl w-auto shrink-0 ${sizeStyle} ${variantStyle} ${className}`

  return (
    <button type={type} className={buttonStyle} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
