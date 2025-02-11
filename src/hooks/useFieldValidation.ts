import { useCallback, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import type { UseMutateFunction } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type ValidationProps<T> = {
  fieldName: string
  initialValue: string
  mutate: UseMutateFunction<AxiosResponse, AxiosError, T, unknown>
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

    mutate({ body: { [fieldName]: value } } as T, {
      onSuccess: (response) => setValidationState({ isValidated: true, message: response.data }),
      onError: (error) =>
        setValidationState({ isValidated: false, message: error.response?.data as string }),
    })
  }, [clearErrors, fieldName, getValues, mutate])

  useEffect(() => {
    if (fieldValue === initialValue) {
      setValidationState({ isValidated: true, message: '' })
    }
  }, [fieldValue, initialValue])

  return { validationState, validateField }
}
