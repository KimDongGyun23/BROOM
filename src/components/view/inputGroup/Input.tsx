import type { ChangeEvent, InputHTMLAttributes } from 'react'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { useToggle } from '@/hooks/useToggle'

import { EyeCloseIcon, EyeIcon } from '../icons/NonActiveIcons'

import { InputGroupContext } from '.'

export const Input = ({ type = 'text', ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  const { register } = useFormContext()
  const section = useContext(InputGroupContext)

  return (
    <InputContainer>
      <StyledInput
        type={type}
        {...register(section)}
        autoComplete={type === 'id' ? 'username' : 'off'}
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
        {...register(section)}
        autoComplete="current-password"
        {...rest}
      />
      <VisibilityButton type="button" onClick={toggleVisibility}>
        {isVisible ? <EyeIcon /> : <EyeCloseIcon />}
      </VisibilityButton>
    </InputContainer>
  )
}

type UnitInputProps = InputHTMLAttributes<HTMLInputElement> & {
  unitLabel: string
  isPrice?: boolean
}

export const UnitInput = ({ unitLabel, isPrice = false, ...rest }: UnitInputProps) => {
  const { register, setValue } = useFormContext()
  const section = useContext(InputGroupContext)

  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    let formattedValue = event.target.value.replace(/[^0-9]/g, '')
    if (formattedValue) formattedValue = parseInt(formattedValue, 10).toLocaleString('ko-KR')

    setValue(section, formattedValue)
  }

  return (
    <InputContainer>
      <StyledUnitInput
        size={5}
        $textAlign="right"
        {...register(section, { onChange: isPrice ? handleCurrencyChange : undefined })}
        {...rest}
      />
      <InputLabel>{unitLabel}</InputLabel>
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
    const value = Math.max(0, Math.min(23, parseInt(event.target.value, 10) || 0))
    setValue(hourSection, value)
  }

  const handleMinuteChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(59, parseInt(event.target.value, 10) || 0))
    setValue(minuteSection, value)
  }

  return (
    <InputContainer>
      <StyledUnitInput
        type="number"
        size={2}
        $textAlign="center"
        {...register(hourSection, { onChange: handleHourChange })}
        placeholder="00"
        {...rest}
      />
      <InputLabel>:</InputLabel>
      <StyledUnitInput
        type="number"
        size={2}
        $textAlign="center"
        {...register(hourSection, { onChange: handleMinuteChange })}
        placeholder="00"
        {...rest}
      />
    </InputContainer>
  )
}

export const TextArea = ({ ...rest }: InputHTMLAttributes<HTMLTextAreaElement>) => {
  const { register } = useFormContext()
  const section = useContext(InputGroupContext)

  return <StyledTextArea {...register(section)} {...rest} />
}

const InputContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.lg)};
  width: 100%;
  padding: ${({ theme }) => theme.gap.lg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.black[300]};
`

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.gap.xs} 0;
  ${({ theme }) => theme.font(700, theme.colors.black[500])};

  &::placeholder {
    color: ${({ theme }) => theme.colors.black[300]};
  }

  &:focus {
    outline: none;
  }
`

const VisibilityButton = styled.button`
  flex-shrink: 0;
`

const InputLabel = styled.span`
  flex-shrink: 0;
  padding: ${({ theme }) => theme.gap.xs} 0;
  color: ${({ theme }) => theme.colors.black[500]};
`

const StyledUnitInput = styled(StyledInput)<{ $textAlign: string }>`
  flex-grow: 1;
  min-width: 0;
  text-align: ${({ $textAlign }) => $textAlign};
`

const StyledTextArea = styled.textarea`
  height: 104px;
  resize: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.black[300]};
  padding: 10px ${({ theme }) => theme.gap.xl};

  ${({ theme }) => theme.font(700, theme.colors.black[300])};

  &::placeholder {
    color: ${({ theme }) => theme.colors.black[300]};
  }

  &:focus {
    outline: none;
  }
`
