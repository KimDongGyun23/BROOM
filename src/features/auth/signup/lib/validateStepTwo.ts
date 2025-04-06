import type { FieldValues, UseFormTrigger } from 'react-hook-form'

import { signupAttribute } from '@/entities/auth/config/auth.schema'

export const validateStepTwo = async (
  trigger: UseFormTrigger<FieldValues>,
  isNicknameUnique: boolean | null,
) => {
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = signupAttribute
  const fields = [NICKNAME.section, DISCHARGE_YEAR.section, MILITARY_BRANCH.section]

  if (isNicknameUnique === null) {
    return { isValid: false, errorField: NICKNAME.section }
  }

  const isValid = await trigger(fields)

  return { isValid: isValid && isNicknameUnique }
}
