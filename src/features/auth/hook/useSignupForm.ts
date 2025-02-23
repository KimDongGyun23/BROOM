import { useNavigate } from 'react-router-dom'

import type { SignupData } from '@/features/auth/model/auth.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { useTermsActions } from '@/shared/model/terms'

import { useSignup } from '../api/useAuth.mutation'
import { signupSchema } from '../config/auth.schema'

export const useSignupForm = () => {
  const navigate = useNavigate()
  const formMethod = useCustomForm<SignupData>(signupSchema)
  const { handleSubmit } = formMethod

  const { resetTerms } = useTermsActions()
  const { mutate: signupMutation } = useSignup()

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

  return { formMethod, onSubmit: handleSubmit(handleSubmitForm) }
}
