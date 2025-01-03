import { Link } from 'react-router-dom'

import { HomeUserSection } from '@/components/domain'
import { ArrowRightIcon, BottomNav, MainHeader } from '@/components/view'
import { NOTICE_ARR } from '@/utils'

const SERVICE_ITEMS = [
  { label: '차 타고 같이 갈 사람 없을까?', url: '/carpool' },
  { label: '나는 조기퇴소가 목표야!', url: '/teammate' },
  { label: '버스 신청하러 왔어요~', url: '/bus-reserve' },
]

const NoticeSection = () => (
  <section className="flex-column gap-5 bg-white p-4 shadow-sm">
    <div className="flex-between-align">
      <p className="p-large font-medium">공지사항</p>
      <Link to={'/home'} className="p-xsmall border-b border-b-blue-4 text-blue-5">
        전체보기
      </Link>
    </div>
    <ul className="flex-column gap-3 text-grey-6">
      {NOTICE_ARR.map((item, index) => (
        <li key={index}>
          <Link to={'/home'} className="block w-full">
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

const ServiceSection = () => (
  <section className="flex-column gap-5 bg-white p-4 shadow-sm">
    <p className="p-large font-medium">어떤 서비스를 찾고 있나요?</p>
    <ul className="flex-column gap-3">
      {SERVICE_ITEMS.map(({ label, url }) => (
        <li
          key={label}
          className="p-medium hover-scale rounded-xl bg-blue-4 py-[18px] pl-7 pr-3 font-medium text-grey-1 shadow-sm"
        >
          <Link to={url} className="flex-between-align">
            <p>{label}</p>
            <ArrowRightIcon />
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

export const Home = () => {
  return (
    <div className="flex-column h-full">
      <MainHeader />
      <main className="flex-column scroll grow gap-[6px] bg-grey-1">
        <HomeUserSection />
        <NoticeSection />
        <ServiceSection />
      </main>

      <BottomNav />
    </div>
  )
}
