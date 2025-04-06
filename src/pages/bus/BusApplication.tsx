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
          <EmptyStateContainer>
            <EmptyStateTitle>To Be Continue..</EmptyStateTitle>
            <EmptyMessage label={`현재 버스 신청 기한이 아닙니다. \n조금만 기다려주세요.`} />
          </EmptyStateContainer>
        )}
      </MainContent>

      <BottomNavigation />
    </Container>
  )
}

const MainContent = styled.main`
  ${({ theme }) => theme.margin(0, 'container')}
  ${({ theme }) => theme.padding('lg', 0)}
  position: relative;
  flex-grow: 1;
  overflow-y: scroll;
`

const ButtonContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'md')}
    ${theme.margin('xl', 0, 0)}
  `}
`

const EmptyStateContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
`

const EmptyStateTitle = styled.p`
  font-family: Jalnan;
  font-size: 30px;
  color: ${({ theme }) => theme.colors.black[500]};
  text-align: center;
`
