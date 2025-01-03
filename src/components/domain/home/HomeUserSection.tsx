import { useNavigate } from 'react-router-dom'

import { Button, TentIcon } from '@/components/view'
import { getSessionStorageItem, SESSION_LOGIN_KEY, SESSION_NICKNAME } from '@/utils'

const LoggedInUserContent = () => {
  const nickname = getSessionStorageItem(SESSION_NICKNAME)

  return (
    <>
      <p className="p-medium font-medium">{nickname}님 안녕하세요.</p>
      <p className="p-medium flex-align gap-1 font-medium">
        <span className="font-bold text-blue-5">BROOM</span>에 오신걸 환영합니다.
      </p>
    </>
  )
}

const LoggedOutUserContent = () => (
  <>
    <p className="p-medium flex-align gap-1 font-medium">
      <span className="font-bold text-blue-5">BROOM</span>에 가입하고
    </p>
    <p className="p-medium font-medium">다른 사람들을 모아보세요.</p>
  </>
)

export const HomeUserSection = () => {
  const navigate = useNavigate()
  const loginSession = getSessionStorageItem(SESSION_LOGIN_KEY)

  const handleLogin = () => navigate('/login')
  const handleSignUp = () => navigate('/sign-up')

  return (
    <section className="bg-white px-4 py-7 shadow-sm">
      <div className="flex-align">
        <div className="flex-column grow gap-1">
          {loginSession ? <LoggedInUserContent /> : <LoggedOutUserContent />}
        </div>
        <TentIcon />
      </div>

      {!loginSession && (
        <div className="flex-align mt-4 w-full gap-3">
          <Button size="sm" classname="grow" onClick={handleLogin}>
            로그인
          </Button>
          <Button size="sm" secondary classname="grow" onClick={handleSignUp}>
            회원가입
          </Button>
        </div>
      )}
    </section>
  )
}
