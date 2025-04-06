import { useNavigate } from 'react-router-dom'

import type { SignupData } from '@/entities/auth/model/auth.type'

import { useSignupMutation } from '../api/useSignup.mutation'

import { useTermsActions } from './terms.store'

export const useSignup = () => {
  const navigate = useNavigate()

  const { resetTerms } = useTermsActions()

  const { mutate: signupMutation } = useSignupMutation()

  const handleSignup = (formData: SignupData) => {
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

  return { handleSignup }
}
