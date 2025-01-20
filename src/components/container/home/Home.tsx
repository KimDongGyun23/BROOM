import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { HomeUserSection } from '@/components/domain/home/HomeUserSection'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { ArrowRightIcon } from '@/components/view/icons/NonActiveIcons'
import { MainHeader } from '@/components/view/MainHeader'

const NOTICE_ARR = [
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
] as const

const SERVICE_ITEMS = [
  { label: '차 타고 같이 갈 사람 없을까?', path: '/carpool' },
  { label: '나는 조기퇴소가 목표야!', path: '/team' },
  { label: '버스 신청하러 왔어요~', path: '/bus-reserve' },
] as const

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.black[100]};
  overflow-y: scroll;
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.xxl};
  background-color: white;
  padding: ${({ theme }) => theme.gap.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: ${({ theme }) => theme.fontSize[600]};
    line-height: ${({ theme }) => theme.lineHeight[600]};
  }
`

const ViewAllLink = styled(Link)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSize[900]};
  line-height: ${({ theme }) => theme.lineHeight[900]};
  color: ${({ theme }) => theme.colors.black[500]};
`

const NoticeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.lg};
  font-size: ${({ theme }) => theme.fontSize[800]};
  line-height: ${({ theme }) => theme.lineHeight[800]};
  color: ${({ theme }) => theme.colors.black[400]};
`

const ServiceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.lg};
`

const ServiceItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px ${({ theme }) => theme.gap.lg} 18px 28px;
  background-color: ${({ theme }) => theme.colors.black[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  font-size: ${({ theme }) => theme.fontSize[700]};
  line-height: ${({ theme }) => theme.lineHeight[700]};
  color: ${({ theme }) => theme.colors.black[100]};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`

const NoticeSection = () => (
  <Section>
    <SectionHeader>
      <h4 className="title">공지사항</h4>
      <ViewAllLink to={'/home'}>전체보기</ViewAllLink>
    </SectionHeader>

    <NoticeList>
      {NOTICE_ARR.map((item, index) => (
        <li key={index}>
          <Link to={'/home'}>{item}</Link>
        </li>
      ))}
    </NoticeList>
  </Section>
)

const ServiceSection = () => (
  <Section>
    <h4 className="title">어떤 서비스를 찾고 있나요?</h4>
    <ServiceList className="flex-column gap-3">
      {SERVICE_ITEMS.map(({ label, path }) => (
        <li key={label}>
          <ServiceItem to={path}>
            <p>{label}</p>
            <ArrowRightIcon />
          </ServiceItem>
        </li>
      ))}
    </ServiceList>
  </Section>
)

export const Home = () => {
  return (
    <Container>
      <MainHeader />
      <Main>
        <HomeUserSection />
        <NoticeSection />
        <ServiceSection />
      </Main>

      <BottomNavigation />
    </Container>
  )
}
