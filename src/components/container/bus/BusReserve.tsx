import { useNavigate } from 'react-router-dom'

import { BottomNav, Button, MainHeader } from '@/components/view'
import { BUS_RESERVE_CONTENT } from '@/utils'

type ContentItemProps = {
  label: string
  contents: string[]
}

const ContentItem = ({ label, contents }: ContentItemProps) => {
  const isSingleItem = contents.length === 1
  const layoutStyle = isSingleItem ? 'flex-between-align' : 'flex-column gap-3'
  const dotStyle = isSingleItem ? '' : 'ml-6 list-disc'

  return (
    <div className={layoutStyle}>
      <h6 className="mr-4 shrink-0 font-medium text-blue-500">{label}</h6>
      <ul className="flex-column gap-2">
        {contents.map((content) => (
          <li key={content} className={`text-grey-600 ${dotStyle}`}>
            {content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const BusReserve = () => {
  const navigate = useNavigate()

  const handleReserveClick = () => navigate('/bus-reserve/create')
  const handleCheckClick = () => navigate('/bus-reserve/info')

  return (
    <div className="flex-column h-full">
      <MainHeader />

      <main className="flex-column scroll mx-4 grow gap-6 pb-8">
        <h5 className="my-6 font-bold">현재 버스 예약 접수 중입니다.</h5>
        {BUS_RESERVE_CONTENT.map((item) => (
          <ContentItem key={item.label} {...item} />
        ))}

        <div className="flex-column gap-3">
          <Button size="md" onClick={handleReserveClick}>
            예약하러 가기
          </Button>
          <Button size="md" secondary onClick={handleCheckClick}>
            예약 내역 조회하기
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
