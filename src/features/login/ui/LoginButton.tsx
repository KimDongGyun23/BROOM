import { Button } from '@/shared/ui/Button'

import { useLogin } from '../hook/useLogin'

export const LoginButton = () => {
  const { onSubmit } = useLogin()

  return (
    <Button size="lg" onClick={onSubmit}>
      로그인
    </Button>
  )
}
