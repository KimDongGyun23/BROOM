import type { ChangeEvent, InputHTMLAttributes } from 'react'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { useToggle } from '@/shared/hook/useToggle'

import { EyeCloseIcon, EyeIcon } from '../icons/NonActiveIcons'

import { InputGroupContext } from '.'

export const Input = ({ type = 'text', ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  const { register } = useFormContext()
  const section = useContext(InputGroupContext)

  return (
    <InputContainer>
      <StyledInput
        type={type}
        id={section}
        autoComplete={type === 'id' ? 'username' : 'off'}
        {...register(section)}
        {...rest}
      />
    </InputContainer>
  )
}

export const NumberInput = ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  const { register, setValue } = useFormContext()
  const section = useContext(InputGroupContext)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement
    input.value = input.value.replace(/[^0-9]/g, '')
    setValue(section, input.value)
  }

  return (
    <InputContainer>
      <StyledInput
        type="text"
        id={section}
        {...register(section, { onChange: handleChange })}
        {...rest}
      />
    </InputContainer>
  )
}

export const DateInput = ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  const { register } = useFormContext()
  const section = useContext(InputGroupContext)

  return (
    <InputContainer>
      <StyledInput
        type="date"
        id={section}
        required
        aria-required="true"
        {...register(section)}
        {...rest}
      />
    </InputContainer>
  )
}

export const PasswordInput = ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  const { register } = useFormContext()
  const section = useContext(InputGroupContext)
  const [isVisible, toggleVisibility] = useToggle(false)

  return (
    <InputContainer>
      <StyledInput
        type={isVisible ? 'text' : 'password'}
        id={section}
        autoComplete="current-password"
        {...register(section)}
        {...rest}
      />
      <VisibilityButton type="button" onClick={toggleVisibility}>
        {isVisible ? <EyeIcon /> : <EyeCloseIcon />}
      </VisibilityButton>
    </InputContainer>
  )
}

export const PersonnelInput = () => {
  const { register, setValue } = useFormContext()
  const section = useContext(InputGroupContext)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement
    input.value = input.value.replace(/[^0-9]/g, '')
    const value =
      event.target.value === ''
        ? ''
        : Math.max(0, Math.min(11, parseInt(event.target.value, 10) || 0))
    setValue(section, value)
  }

  return (
    <InputContainer>
      <StyledUnitInput
        type="text"
        size={5}
        id={section}
        $textAlign="right"
        placeholder="0"
        {...register(section, { onChange: handleChange })}
      />
      <InputLabel>명</InputLabel>
    </InputContainer>
  )
}

type TimeInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hourSection: string
  minuteSection: string
}

export const TimeInput = ({ hourSection, minuteSection, ...rest }: TimeInputProps) => {
  const { register, setValue } = useFormContext()

  const handleHourChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement
    input.value = input.value.replace(/[^0-9]/g, '')
    const value =
      event.target.value === ''
        ? ''
        : Math.max(0, Math.min(23, parseInt(event.target.value, 10) || 0))
    setValue(hourSection, value.toString().padStart(2, '0'))
  }

  const handleMinuteChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement
    input.value = input.value.replace(/[^0-9]/g, '')
    const value =
      event.target.value === ''
        ? ''
        : Math.max(0, Math.min(59, parseInt(event.target.value, 10) || 0))
    setValue(minuteSection, value.toString().padStart(2, '0'))
  }

  return (
    <InputContainer>
      <StyledUnitInput
        type="text"
        $textAlign="center"
        id={hourSection}
        placeholder="00"
        size={5}
        {...register(hourSection, { onChange: handleHourChange })}
        {...rest}
      />
      <InputLabel>:</InputLabel>
      <StyledUnitInput
        type="text"
        $textAlign="center"
        id={minuteSection}
        placeholder="00"
        size={5}
        {...register(minuteSection, { onChange: handleMinuteChange })}
        {...rest}
      />
    </InputContainer>
  )
}

export const TextArea = ({ ...rest }: InputHTMLAttributes<HTMLTextAreaElement>) => {
  const { register } = useFormContext()
  const section = useContext(InputGroupContext)

  return <StyledTextArea id={section} {...register(section)} {...rest} />
}

const InputContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', undefined, 'lg')}
    ${theme.padding('md', 'md', 'md', 'md')}
    ${theme.border('input')}
    ${theme.borderRadius('sm')}
  `}
  width: 100%;
`

const StyledInput = styled.input`
  ${({ theme }) => `
    ${theme.padding('xs', 0)}
    ${theme.font(700, theme.colors.black[500])}
  `}
  flex-grow: 1;
  height: 24px;
`

const VisibilityButton = styled.button`
  flex-shrink: 0;
`

const InputLabel = styled.span`
  ${({ theme }) => theme.padding('xs', 0)}
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.black[500]};
`

const StyledUnitInput = styled(StyledInput)<{ $textAlign: string }>`
  flex-grow: 1;
  min-width: 0;
  text-align: ${({ $textAlign }) => $textAlign};
`

const StyledTextArea = styled.textarea`
  ${({ theme }) => `
    ${theme.padding('md', 'lg')}
    ${theme.border('input')}
    ${theme.borderRadius('sm')}
    ${theme.font(700, theme.colors.black[500])}
  `}
  height: 104px;
  resize: none;
`
