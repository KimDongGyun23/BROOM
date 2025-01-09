import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { TentIcon } from '@/components/view/icons/NonActiveIcons'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

const LoggedInUserContent = () => {
  const nickname = getSessionStorageItem(SESSION_KEYS.NICKNAME)

  return (
    <>
      <p className="p-700 text-black-500">{nickname}님 안녕하세요.</p>
      <p className="p-700 flex-align gap-1 text-black-500">
        <span className="font-jalnan text-2xl text-black-600">BROOM</span>에 오신걸 환영합니다.
      </p>
    </>
  )
}

const LoggedOutUserContent = () => (
  <>
    <p className="p-700 flex-align gap-1 text-black-500">
      <span className="font-jalnan text-2xl text-black-600">BROOM</span>에 가입하고
    </p>
    <p className="p-700 text-black-500">다른 사람들을 모아보세요.</p>
  </>
)

export const HomeUserSection = () => {
  const navigate = useNavigate()
  const session = !!getSessionStorageItem(SESSION_KEYS.LOGIN)

  const handleLogin = () => navigate('/login')
  const handleSignUp = () => navigate('/sign-up')

  return (
    <section className="bg-white px-4 py-7 shadow-sm">
      <div className="flex-align">
        <div className="flex-column grow gap-1">
          {session ? <LoggedInUserContent /> : <LoggedOutUserContent />}
        </div>
        <TentIcon />
      </div>

      {!session && (
        <div className="flex-align mt-4 w-full gap-3">
          <Button size="sm" className="grow" onClick={handleLogin}>
            로그인
          </Button>
          <Button size="sm" secondary className="grow" onClick={handleSignUp}>
            회원가입
          </Button>
        </div>
      )}
    </section>
  )
}
