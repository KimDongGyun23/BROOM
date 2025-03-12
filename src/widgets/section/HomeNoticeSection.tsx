import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const NOTICE_ARR = [
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
] as const

export const HomeNoticeSection = () => {
  return (
    <NoticeSection>
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
    </NoticeSection>
  )
}

const NoticeSection = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'xl')}
    ${theme.padding('lg')}
    ${theme.boxShadow('sm')}
  `}
  background-color: white;

  .title {
    ${({ theme }) => theme.font(600, theme.colors.black[600])};
  }
`

const SectionHeader = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')};
`

const ViewAllLink = styled(Link)`
  ${({ theme }) => `
    ${theme.border('underline', 'bottom')}
    ${theme.font(900, theme.colors.black[500])}
  `}
`

const NoticeList = styled.ul`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'md')}
    ${theme.font(800, theme.colors.black[400])}
  `}
`
