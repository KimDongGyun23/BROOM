import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import type { SignupData } from '@/entities/auth/model/auth.type'
import { useTermsActions } from '@/features/agree-term/model/terms.store'
import { useModalActions } from '@/shared/model/modal.store'

import { useSignupMutation } from '../api/useSignup.mutation'

export const useSignup = () => {
  const navigate = useNavigate()
  const { handleSubmit } = useFormContext<SignupData>()

  const { openOneButtonModal } = useModalActions()
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
        onError: (error) => openOneButtonModal(error.message, false),
      },
    )
  }

  return { onSubmit: handleSubmit(handleSubmitForm) }
}
