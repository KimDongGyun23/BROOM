import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { BottomNavigation } from '@/components/view/BottomNavigation'
import { Button } from '@/components/view/Button'
import { MainHeader } from '@/components/view/MainHeader'

const BUS_RESERVE_CONTENT = [
  { label: '신청 기간', contents: ['05/08 (수) ~ 05/12 (일)'] },
  { label: '신청 대상', contents: ['예비군에 참여하는 광운대학교 재학생'] },
  {
    label: '운행 방식',
    contents: [
      '광운대학교 구 정문 (복지관 1층) - 금곡 예비군 훈련장',
      '버스 탑승료 무료',
      '일자별 버스 2대, 총 88석 추첨',
    ],
  },
  {
    label: '당첨자 추첨',
    contents: ['05/13 (월) 18시 인스타그램 라이브 방송', '작성한 연락처로 개별 연락 예정'],
  },
  {
    label: '당첨자 입금 기한',
    contents: [
      '05/14 (화) 23:59',
      '입금 계좌는 당첨자 개별 연락 시 공지 예정',
      '노쇼 방지를 위해 당첨자 대상으로 보증금 (2만원) 제도를 실시하며, 보증금 미입금시 당첨 취소처리 됩니다.',
      '보증금은 06/03 (월)에 일괄 환급 예정',
    ],
  },
  {
    label: '주의사항',
    contents: [
      '학생증이나 광운대학교 도서관 출입증을 준비해주세요.',
      '05/14까지 보증금 2만원을 입금하지 않으면 추첨 명단에서 제외됩니다.',
      '귀가 시에도 버스를 이용하셔야 신청이 가능합니다.',
      '귀가 버스를 이용하지 않으시면 보증금 환급이 불가능합니다. ( 개별 귀가 불가능 )',
    ],
  },
]

type ContentItemProps = {
  label: string
  contents: string[]
}

const ContentItem = ({ label, contents }: ContentItemProps) => {
  const isSingleItem = contents.length === 1

  return (
    <ContentContainer $isSingleItem={isSingleItem}>
      <h6 className="content-label">{label}</h6>
      <ContentList $isSingleItem={isSingleItem}>
        {contents.map((content) => (
          <li key={content} className="content-item">
            {content}
          </li>
        ))}
      </ContentList>
    </ContentContainer>
  )
}

export const BusReserve = () => {
  const navigate = useNavigate()

  const handleReserveClick = () => navigate('/bus-reserve/create')
  const handleCheckClick = () => navigate('/bus-reserve/info')

  return (
    <Container>
      <MainHeader />

      <MainContent>
        <h5 className="main-title">현재 버스 예약 접수 중입니다.</h5>
        {BUS_RESERVE_CONTENT.map((item) => (
          <ContentItem key={item.label} {...item} />
        ))}

        <ButtonContainer>
          <Button size="md" onClick={handleReserveClick}>
            예약하러 가기
          </Button>
          <Button size="md" secondary onClick={handleCheckClick}>
            예약 내역 조회하기
          </Button>
        </ButtonContainer>
      </MainContent>

      <BottomNavigation />
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

const MainContent = styled.main`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, '24px')};
  margin: 0 ${({ theme }) => theme.gap.xl};
  flex-grow: 1;
  padding-bottom: 32px;
  overflow-y: scroll;

  .main-title {
    ${({ theme }) => theme.font(500, theme.colors.blue[500])};
  }
`

const ContentContainer = styled.div<{ $isSingleItem: boolean }>`
  ${({ theme, $isSingleItem }) =>
    theme.flexBox(
      $isSingleItem ? 'row' : 'column',
      $isSingleItem ? 'center' : 'stretch',
      undefined,
      !$isSingleItem ? theme.gap.lg : undefined,
    )};

  .content-label {
    margin-right: ${({ theme }) => theme.gap.xl};
    flex-shrink: 0;
    ${({ theme }) => theme.font(600, theme.colors.black[600])};
  }
`

const ContentList = styled.ul<{ $isSingleItem: boolean }>`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, theme.gap.sm)};
  list-style-type: ${({ $isSingleItem }) => ($isSingleItem ? 'none' : 'disc')};
  margin-left: ${({ $isSingleItem }) => ($isSingleItem ? '0' : '24px')};

  .content-item {
    ${({ theme }) => theme.font(800, theme.colors.black[400])};
  }
`

const ButtonContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, theme.gap.lg)};
`
