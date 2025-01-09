import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view/Button'

export const ErrorPage = () => {
  const navigate = useNavigate()
  const goToHome = () => {
    navigate('/home', { replace: true })
  }

  return (
    <div className="grid size-full place-items-center">
      <div className="flex-column-align gap-8">
        <h2 className="font-jalnan text-[64px] text-black-600">404</h2>
        <p className="p-700 text-black-500">{`네트워크 에러가 발생했어요...\n재시도 부탁드립니다.`}</p>
        <div className="w-full pt-20">
          <Button size="lg" className="hover-scale w-full" onClick={goToHome}>
            홈으로 이동하기
          </Button>
        </div>
      </div>
    </div>
  )
}
