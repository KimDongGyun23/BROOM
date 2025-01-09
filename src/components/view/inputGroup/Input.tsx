import type { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'

import { useToggle } from '@/hooks'

import { EyeCloseIcon, EyeIcon } from '../icons/NonActiveIcons'

type InputProps = {
  type?: 'text' | 'password' | 'id' | 'number'
  section: string
  readOnly?: boolean
  placeholder?: string
}

export const Input = ({ type = 'text', section, readOnly = false, placeholder }: InputProps) => {
  const { register } = useFormContext()
  const isPasswordField = type === 'password'
  const [isVisible, toggleVisibility] = useToggle(false)

  return (
    <div className="flex-align w-full gap-3 rounded-lg border border-black-300 px-4 py-[10px]">
      <input
        type={isPasswordField && !isVisible ? 'password' : type}
        {...register(section)}
        readOnly={readOnly}
        className="p-700 w-full py-1 text-black-500 placeholder:text-black-300 focus:outline-none"
        placeholder={placeholder}
        autoComplete={type === 'id' ? 'username' : isPasswordField ? 'current-password' : 'off'}
      />
      {isPasswordField && !readOnly && (
        <button type="button" className="shrink-0" onClick={toggleVisibility}>
          {isVisible ? <EyeIcon /> : <EyeCloseIcon />}
        </button>
      )}
    </div>
  )
}

type UnitInputProps = InputProps & {
  unitLabel: string
  isPrice?: boolean
}

export const UnitInput = ({
  type = 'text',
  section,
  unitLabel,
  isPrice = false,
  readOnly = false,
  placeholder,
}: UnitInputProps) => {
  const { register, setValue } = useFormContext()

  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    let formattedValue = event.target.value.replace(/[^0-9]/g, '')
    if (formattedValue) formattedValue = parseInt(formattedValue, 10).toLocaleString('ko-KR')

    setValue(section, formattedValue)
  }

  return (
    <div className="flex-align w-full gap-3 rounded-lg border border-black-300 px-4 py-[10px]">
      <input
        type={type}
        size={5}
        {...register(section, { onChange: isPrice ? handleCurrencyChange : undefined })}
        readOnly={readOnly}
        className="p-700 min-w-0 grow text-right text-black-500 placeholder:text-black-300 focus:outline-none"
        placeholder={placeholder}
      />
      <p className="shrink-0 py-1 text-black-500">{unitLabel}</p>
    </div>
  )
}

type TimeInputProps = {
  hourSection: string
  minuteSection: string
  readOnly?: boolean
}

export const TimeInput = ({ readOnly = false, hourSection, minuteSection }: TimeInputProps) => {
  const { register, setValue } = useFormContext()

  const handleHourChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(23, parseInt(event.target.value, 10) || 0))
    setValue(hourSection, value)
  }

  const handleMinuteChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(59, parseInt(event.target.value, 10) || 0))
    setValue(minuteSection, value)
  }

  return (
    <div className="flex-align w-full gap-3 rounded-lg border border-black-300 px-4 py-[10px]">
      <input
        type="number"
        {...register(hourSection, { onChange: handleHourChange })}
        readOnly={readOnly}
        size={2}
        className="p-700 w-full grow text-center text-black-500 placeholder:text-black-300 focus:outline-none"
        placeholder="00"
      />
      <span className="shrink-0 py-1 text-black-500">:</span>
      <input
        type="number"
        {...register(minuteSection, { onChange: handleMinuteChange })}
        readOnly={readOnly}
        size={2}
        className="p-700 w-full grow text-center text-black-500 placeholder:text-black-300 focus:outline-none"
        placeholder="00"
      />
    </div>
  )
}

type TextAreaProps = Omit<InputProps, 'type'>

export const TextArea = ({ section, readOnly = false, placeholder }: TextAreaProps) => {
  const { register } = useFormContext()
  return (
    <textarea
      {...register(section)}
      readOnly={readOnly}
      className="p-700 h-[104px] resize-none rounded-lg border border-black-300 px-4 py-[10px] text-black-500 placeholder:text-black-300 focus:outline-none"
      placeholder={placeholder}
    />
  )
}
