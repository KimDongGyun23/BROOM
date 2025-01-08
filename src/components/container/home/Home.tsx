import { Link } from 'react-router-dom'

import { HomeUserSection } from '@/components/domain/home/HomeUserSection'
import { BottomNav } from '@/components/view/BottomNav'
import { MainHeader } from '@/components/view/header/MainHeader'
import { ArrowRightIcon } from '@/components/view/icons/NonActiveIcons'
import { NOTICE_ARR } from '@/utils/constants'

const SERVICE_ITEMS = [
  { label: '차 타고 같이 갈 사람 없을까?', url: '/carpool' },
  { label: '나는 조기퇴소가 목표야!', url: '/team' },
  { label: '버스 신청하러 왔어요~', url: '/bus-reserve' },
]

const NoticeSection = () => (
  <section className="flex-column gap-5 bg-white p-4 shadow-sm">
    <div className="flex-between-align">
      <p className="p-large font-medium">공지사항</p>
      <Link to={'/home'} className="p-xsmall border-b border-b-blue-400 text-blue-500">
        전체보기
      </Link>
    </div>
    <ul className="flex-column gap-3 text-grey-600">
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
          className="p-medium hover-scale rounded-xl bg-blue-400 py-[18px] pl-7 pr-3 font-medium text-grey-100 shadow-sm"
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
      <main className="flex-column scroll grow gap-[6px] bg-grey-100">
        <HomeUserSection />
        <NoticeSection />
        <ServiceSection />
      </main>

      <BottomNav />
    </div>
  )
}
