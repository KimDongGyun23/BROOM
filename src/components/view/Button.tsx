import type { ButtonHTMLAttributes } from 'react'

const SIZE_STYLES = {
  lg: 'px-5 py-4 p-700',
  md: 'px-4 py-4 p-800',
  sm: 'px-3 py-[14px] p-900',
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
    secondary || disabled ? 'bg-black-100 text-black-500' : 'bg-black-600 text-black-100'

  const buttonStyle = `rounded-xl w-auto shrink-0 ${sizeStyle} ${variantStyle} ${className}`

  return (
    <button type={type} className={buttonStyle} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
