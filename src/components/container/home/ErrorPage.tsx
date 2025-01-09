import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view/Button'

export const ErrorPage = () => {
  const navigate = useNavigate()
  const goToHome = () => {
    navigate('/home', { replace: true })
  }

  return (
    <div className="absolute inset-0 z-50 grid size-full min-w-[320px] max-w-[450px] place-items-center bg-white px-4">
      <div className="flex-column-align min-w-[260px] gap-8">
        <h2 className="font-jalnan text-[64px] text-black-600">404</h2>
        <p className="p-700 whitespace-pre-wrap text-center text-black-500">{`현재 페이지가 존재하지 않아요...\n재시도 부탁드립니다.`}</p>
        <div className="w-full pt-20">
          <Button size="lg" className="hover-scale w-full" onClick={goToHome}>
            홈으로 이동하기
          </Button>
        </div>
      </div>
    </div>
  )
}
