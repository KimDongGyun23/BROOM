import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import type { SignupData } from '@/entities/auth/model/auth.type'
import { useTermsActions } from '@/features/agree-term/model/terms.store'

import { useSignupMutation } from '../api/useSignup.mutation'

export const useSignup = () => {
  const navigate = useNavigate()
  const { handleSubmit } = useFormContext<SignupData>()

  const { resetTerms } = useTermsActions()

  const { mutate: signupMutation } = useSignupMutation()

  const handleSubmitForm = (formData: SignupData) => {
    const { confirm: _confirm, ...dataWithoutConfirm } = formData
    signupMutation(
      { body: dataWithoutConfirm },
      {
        onSuccess: () => {
          navigate('/sign-up/complete')
          resetTerms()
        },
      },
    )
  }

  return { onSubmit: handleSubmit(handleSubmitForm) }
}
