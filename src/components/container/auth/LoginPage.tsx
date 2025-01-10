import { FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { useLoginForm } from '@/hooks'
import { useLoginLogic } from '@/services/service'
import { FORM_ATTRIBUTE } from '@/utils/constants'

export const LoginPage = () => {
  const formMethod = useLoginForm()

  const { handleSubmit } = formMethod
  const { isLoginFailed, handleLogin } = useLoginLogic()

  return (
    <div className="flex-column">
      <h1 className="mt-[20svh] text-center font-jalnan text-6xl leading-[44px] text-black-600">
        BROOM
      </h1>

      <FormProvider {...formMethod}>
        <form
          className="flex-column mx-4 mt-[15svh] gap-[22px]"
          onSubmit={handleSubmit(handleLogin)}
        >
          <InputGroup section={FORM_ATTRIBUTE.LOGIN_ID.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.LOGIN_ID.label} />
            <InputGroup.Input {...FORM_ATTRIBUTE.LOGIN_ID.input} />
          </InputGroup>

          <InputGroup section={FORM_ATTRIBUTE.LOGIN_PASSWORD.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.LOGIN_PASSWORD.label} />
            <InputGroup.Input {...FORM_ATTRIBUTE.LOGIN_PASSWORD.input} />
          </InputGroup>

          <Button size="lg" type="submit">
            로그인
          </Button>
        </form>
      </FormProvider>

      <div
        className={`mx-4 mt-[22px] ${isLoginFailed ? 'flex-between-align' : 'flex justify-end'}`}
      >
        {isLoginFailed && (
          <p className="p-900 text-error">* 아이디 또는 비밀번호가 일치하지 않습니다.</p>
        )}
        <Link
          to={'/sign-up'}
          className="inline-block border-b border-b-black-500 pb-1 text-black-500"
        >
          회원가입
        </Link>
      </div>
    </div>
  )
}
