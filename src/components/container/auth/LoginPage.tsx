import { FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button, InputGroup } from '@/components/view'
import { useLoginForm } from '@/hooks'
import { useLoginLogic } from '@/services/service'

export const LoginPage = () => {
  const formMethod = useLoginForm()

  const { handleSubmit } = formMethod
  const { isLoginFailed, handleLogin } = useLoginLogic()

  return (
    <div className="flex-column">
      <h1 className="mt-[20svh] text-center font-jalnan text-6xl leading-[44px] text-blue-600">
        BROOM
      </h1>

      <FormProvider {...formMethod}>
        <form
          className="flex-column mx-4 mt-[15svh] gap-[22px]"
          onSubmit={handleSubmit(handleLogin)}
        >
          <InputGroup>
            <InputGroup.Label section="userId">아이디</InputGroup.Label>
            <InputGroup.Input section="userId" placeholder="아이디를 입력해주세요." />
          </InputGroup>

          <InputGroup>
            <InputGroup.Label section="password">비밀번호</InputGroup.Label>
            <InputGroup.Input
              section="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
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
          <p className="p-xsmall text-red-200">* 아이디 또는 비밀번호가 일치하지 않습니다.</p>
        )}
        <Link
          to={'/sign-up'}
          className=" inline-block border-b border-b-grey-500 pb-1 text-grey-500"
        >
          회원가입
        </Link>
      </div>
    </div>
  )
}
