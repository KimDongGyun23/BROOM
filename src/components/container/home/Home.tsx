import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { HomeUserSection } from '@/components/domain/home/HomeUserSection'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { ArrowRightIcon } from '@/components/view/icons/NonActiveIcons'
import { MainHeader } from '@/components/view/MainHeader'
import { Container } from '@/styles/commonStyles'

const NOTICE_ARR = [
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
] as const

const SERVICE_ITEMS = [
  { label: '차 타고 같이 갈 사람 없을까?', path: '/carpool' },
  { label: '버스 신청하러 왔어요~', path: '/bus-reserve' },
] as const

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

const Main = styled.main`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'sm')}
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.black[100]};
  overflow-y: scroll;
`

const Section = styled.section`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.padding('lg')};
  ${({ theme }) => theme.boxShadow('sm')};
  background-color: white;

  .title {
    ${({ theme }) => theme.font(600, theme.colors.black[600])};
  }
`

const SectionHeader = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')};
`

const ViewAllLink = styled(Link)`
  ${({ theme }) => theme.border('underline', 'bottom')};
  ${({ theme }) => theme.font(900, theme.colors.black[500])};
`

const NoticeList = styled.ul`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'md')};
  ${({ theme }) => theme.font(800, theme.colors.black[400])};
`

const ServiceList = styled.ul`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'md')};
`

const ServiceItem = styled(Link)`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')};
  ${({ theme }) => theme.padding('lg', 'md', 'lg', '3xl')};
  ${({ theme }) => theme.borderRadius('md')};
  ${({ theme }) => theme.boxShadow('sm')};
  ${({ theme }) => theme.font(700, theme.colors.black[100])};
  background-color: ${({ theme }) => theme.colors.black[400]};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`
