import { useFormContext } from 'react-hook-form'

import type { LoginCredentials } from '@/entities/auth/model/auth.type'
import { useLogin } from '@/features/login/hook/useLogin'
import { Button } from '@/shared/ui/Button'

export const LoginButton = () => {
  const { handleLogin } = useLogin()

  const { handleSubmit } = useFormContext<LoginCredentials>()

  return (
    <Button size="lg" onClick={handleSubmit(handleLogin)}>
      로그인
    </Button>
  )
}
