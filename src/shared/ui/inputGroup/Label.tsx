import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { InputGroupContext } from '.'

type LabelProps = {
  label: string
  successMessage?: string | null
  errorMessage?: string | null
}

const renderMessage = (
  currentErrorMessage: string | undefined,
  errorMessage: string | null | undefined,
  successMessage: string | null | undefined,
) => {
  if (currentErrorMessage) return <MessageText $type="error">* {currentErrorMessage}</MessageText>
  if (errorMessage) return <MessageText $type="error">* {errorMessage}</MessageText>
  if (successMessage) return <MessageText $type="success">* {successMessage}</MessageText>
  return null
}

export const Label = ({ successMessage, errorMessage, label }: LabelProps) => {
  const {
    formState: { errors },
  } = useFormContext()
  const section = useContext(InputGroupContext)
  const currentErrorMessage = errors[section]?.message?.toString()

  return (
    <Container>
      <label className="label" htmlFor={section}>
        {label}
      </label>
      {renderMessage(currentErrorMessage, errorMessage, successMessage)}
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'md')};

  .label {
    ${({ theme }) => theme.font(600, theme.colors.black[600])};
  }
`

const MessageText = styled.p<{ $type: 'error' | 'success' }>`
  ${({ theme, $type }) =>
    theme.font(900, $type === 'error' ? theme.colors.error : theme.colors.success)};
`
