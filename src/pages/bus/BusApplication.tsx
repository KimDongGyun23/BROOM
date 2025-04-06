import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { useBusApplication } from '@/features/bus-application/model/useBusApplication'
import { BusNoticeSection } from '@/features/bus-application/ui/BusNoticeSection'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { Button } from '@/shared/ui/Button'
import { EmptyMessage } from '@/shared/ui/Error'
import { MainHeader } from '@/shared/ui/MainHeader'

export const BusApplication = () => {
  const { isBusFormOpen, handleNoticeRedirect, handleFormRedirect } = useBusApplication()

  return (
    <Container>
      <MainHeader secondary title="버스 신청" />

      <MainContent>
        {isBusFormOpen ? (
          <>
            <BusNoticeSection />

            <ButtonContainer>
              <Button size="md" secondary onClick={handleNoticeRedirect}>
                공지사항 보러 가기
              </Button>

              <Button size="md" onClick={handleFormRedirect}>
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
