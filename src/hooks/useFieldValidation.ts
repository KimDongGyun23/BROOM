import { useCallback, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import type { UseMutateFunction } from '@tanstack/react-query'

type ValidationProps<T> = {
  fieldName: string
  initialValue: string
  mutate: UseMutateFunction<string, Error, T, unknown>
}

export const useFieldValidation = <T>({ fieldName, initialValue, mutate }: ValidationProps<T>) => {
  const { getValues, clearErrors } = useFormContext()
  const fieldValue = useWatch({ name: fieldName })
  const [validationState, setValidationState] = useState({
    isValidated: false,
    message: '',
  })

  const validateField = useCallback(() => {
    const value = getValues(fieldName)
    clearErrors(fieldName)

    mutate({ [fieldName]: value } as T, {
      onSuccess: (res) => setValidationState({ isValidated: true, message: res }),
      onError: (error) => setValidationState({ isValidated: false, message: error.message }),
    })
  }, [clearErrors, fieldName, getValues, mutate])

  useEffect(() => {
    if (fieldValue === initialValue) {
      setValidationState({ isValidated: true, message: '' })
    }
  }, [fieldValue, initialValue])

  return { validationState, validateField }
}
