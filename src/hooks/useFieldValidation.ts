import { useCallback, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import type { UseMutateFunction } from '@tanstack/react-query'

type ValidationProps<T> = {
  fieldName: string
  initialValue: string
  mutate: UseMutateFunction<string, Error, T, unknown>
  successMessage?: string
  errorMessage?: string
}

export const useFieldValidation = <T>({
  fieldName,
  initialValue,
  mutate,
  successMessage = '사용 가능한 값입니다.',
  errorMessage = '이미 사용 중인 값입니다.',
}: ValidationProps<T>) => {
  const { getValues, clearErrors } = useFormContext()
  const fieldValue = useWatch({ name: fieldName })
  const [validationState, setValidationState] = useState({
    isValidated: false,
    message: '',
  })

  const validateField = useCallback(() => {
    const value = getValues(fieldName)

    if (value === initialValue) {
      setValidationState({ isValidated: true, message: '' })
      return
    }
    clearErrors(fieldName)

    mutate({ [fieldName]: value } as T, {
      onSuccess: () => setValidationState({ isValidated: true, message: successMessage }),
      onError: () => setValidationState({ isValidated: false, message: errorMessage }),
    })
  }, [clearErrors, errorMessage, fieldName, getValues, initialValue, mutate, successMessage])

  useEffect(() => {
    if (fieldValue === initialValue) {
      setValidationState({ isValidated: true, message: '' })
    }
  }, [fieldValue, initialValue])

  return { validationState, validateField }
}
