import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { BusNoticeSection } from '@/features/bus-application/ui/BusNoticeSection'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { Button } from '@/shared/ui/Button'
import { EmptyMessage } from '@/shared/ui/Error'
import { MainHeader } from '@/shared/ui/MainHeader'

export const BusApplication = () => {
  const isBusFormOpen = import.meta.env.VITE_BUS_STATE === 'true'
  const busNoticeURL = import.meta.env.VITE_BUS_NOTICE_URL
  const busFormURL = import.meta.env.VITE_BUS_FORM_URL

  const handleClickNoticeButton = () => (window.location.href = busNoticeURL)
  const handleClickFormButton = () => (window.location.href = busFormURL)

  return (
    <Container>
      <MainHeader secondary title="버스 신청" />

      <MainContent>
        {isBusFormOpen ? (
          <>
            <BusNoticeSection />

            <ButtonContainer>
              <Button size="md" secondary onClick={handleClickNoticeButton}>
                공지사항 보러 가기
              </Button>

              <Button size="md" onClick={handleClickFormButton}>
                신청하러 가기
              </Button>
            </ButtonContainer>
          </>
        ) : (
          <EmptyMessage label={`현재 버스 신청 기한이 아닙니다. \n다음에 다시 시도해주세요.`} />
        )}
      </MainContent>

      <BottomNavigation />
    </Container>
  )
}

const MainContent = styled.main`
  ${({ theme }) => theme.margin(0, 'container')}
  ${({ theme }) => theme.padding('lg', 0)}
  flex-grow: 1;
  overflow-y: scroll;
`

const ButtonContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'md')}
    ${theme.margin('xl', 0, 0)}
  `}
`
