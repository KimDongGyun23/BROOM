import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import type { UseMutateFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ValidateIdRequest, ValidateNicknameRequest } from '@/entities/auth/model/auth.type'

import type { CheckSection } from '../model/duplication.type'

type SetStateFunction = (isUnique: boolean, message: string) => void

export const useDuplicationCheck = <
  T extends CheckSection,
  RequestType extends T extends 'userId' ? ValidateIdRequest : ValidateNicknameRequest,
>({
  mutate,
  sectionKey,
  setState,
  errorMessage,
}: {
  mutate: UseMutateFunction<string, AxiosError<string>, RequestType, unknown>
  sectionKey: T
  setState: SetStateFunction
  errorMessage: string
}) => {
  const { getValues, clearErrors } = useFormContext()

  return useCallback(() => {
    const value = getValues(sectionKey)
    clearErrors(sectionKey)

    const requestBody = { body: { [sectionKey]: value } } as unknown as RequestType

    mutate(requestBody, {
      onSuccess: (response: string) => setState(true, response),
      onError: (error) => {
        const message = error.response?.data || errorMessage
        setState(false, message)
      },
    })
  }, [getValues, clearErrors, mutate, setState, sectionKey, errorMessage])
}
