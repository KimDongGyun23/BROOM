import type { PropsWithChildren } from 'react'

const sizeMap = {
  lg: {
    padding: 'px-5 py-4',
    font: 'p-medium font-bold',
  },
  md: {
    padding: 'px-4 py-[15px]',
    font: 'p-small font-bold',
  },
  sm: {
    padding: 'px-3 py-[14px]',
    font: 'p-xsmall font-bold',
  },
} as const

type ButtonType = 'submit' | 'reset' | 'button' | undefined

type ButtonProps = {
  size: keyof typeof sizeMap
  type?: ButtonType
  disabled?: boolean
  secondary?: boolean
  classname?: string
  onClick?: VoidFunction
}

export const Button = ({
  size,
  classname,
  disabled = false,
  onClick,
  type = 'button',
  secondary = false,
  children,
}: PropsWithChildren<ButtonProps>) => {
  const bgStyle = disabled || secondary ? 'bg-grey-200 text-grey-500' : 'bg-blue-500 text-grey-100'
  const buttonStyle = `${sizeMap[size].padding} ${sizeMap[size].font} ${bgStyle} ${classname}`

  return (
    <button
      type={type}
      className={`w-auto shrink-0 rounded-xl text-grey-100 ${buttonStyle}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
