import type { FieldValues, UseFormTrigger } from 'react-hook-form'

import { signupAttribute } from '@/entities/auth/config/auth.schema'

export const validateStepOne = async (
  trigger: UseFormTrigger<FieldValues>,
  isIdUnique: boolean | null,
) => {
  const { ID, PASSWORD, CONFIRM } = signupAttribute
  const fields = [ID.section, PASSWORD.section, CONFIRM.section]

  if (isIdUnique === null) {
    return { isValid: false, errorField: ID.section }
  }

  const isValid = await trigger(fields)

  return { isValid: isValid && isIdUnique }
}
