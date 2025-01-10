import { FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { useLoginForm } from '@/hooks'
import { useLoginLogic } from '@/services/service'

const FORM_ATT = {
  ID: { section: 'userId', label: '아이디', placeholder: '아이디를 입력해주세요.' },
  PASSWORD: {
    section: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요.',
    type: 'password',
  },
}

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
          <InputGroup section={FORM_ATT.ID.section}>
            <InputGroup.Label label={FORM_ATT.ID.label} />
            <InputGroup.Input placeholder={FORM_ATT.ID.placeholder} />
          </InputGroup>

          <InputGroup section={FORM_ATT.PASSWORD.section}>
            <InputGroup.Label label={FORM_ATT.PASSWORD.label} />
            <InputGroup.Input
              type={FORM_ATT.PASSWORD.type}
              placeholder={FORM_ATT.PASSWORD.placeholder}
            />
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
