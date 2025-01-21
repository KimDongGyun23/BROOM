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
    <LabelContainer>
      <LabelText>{label}</LabelText>
      {renderMessage(currentErrorMessage, errorMessage, successMessage)}
    </LabelContainer>
  )
}

const LabelContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.lg)};
`

const LabelText = styled.p`
  font-size: ${({ theme }) => theme.fontSize[600]};
  line-height: ${({ theme }) => theme.lineHeight[600]};
  color: ${({ theme }) => theme.colors.black[600]};
`

const MessageText = styled.p<{ $type: 'error' | 'success' }>`
  font-size: ${({ theme }) => theme.fontSize[900]};
  line-height: ${({ theme }) => theme.lineHeight[900]};
  color: ${({ theme, $type }) => ($type === 'error' ? theme.colors.error : theme.colors.success)};
`
