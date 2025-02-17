import styled from 'styled-components'

import { LogoutButton } from '@/components/domain/mypage/LogoutButton'
import { LogoutModal } from '@/components/domain/mypage/LogoutModal'
import { ArrowRightIcon } from '@/components/view/icons/ActiveIcons'
import { MainHeader } from '@/components/view/MainHeader'
import { ToggleButton } from '@/components/view/ToggleButton'
import { ModalStoreProvider } from '@/stores/modal'

const NavigationButton = ({ label }: { label: string }) => {
  return (
    <StyledButton>
      <p className="button-label">{label}</p>
      <ArrowRightIcon active />
    </StyledButton>
  )
}

export const Admin = () => {
  return (
    <ModalStoreProvider>
      <MainHeader />
      <PageContent>
        <ToggleSection>
          <p className="section-label">버스 신청 활성화</p>
          <ToggleButton />
        </ToggleSection>
        <NavigationButton label="버스 신청 현황 조회" />
        <NavigationButton label="예비군 날짜 선택" />
        <NavigationButton label="게시글 정보" />
      </PageContent>

      <ButtonContainer>
        <LogoutButton />
      </ButtonContainer>
      <LogoutModal />
    </ModalStoreProvider>
  )
}

const PageContent = styled.main`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container')};
`

const ToggleSection = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')};

  .section-label {
    ${({ theme }) => theme.font(700, theme.colors.black[600])};
  }
`

const StyledButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')};

  .button-label {
    ${({ theme }) => theme.font(700, theme.colors.black[600])};
  }
`

const ButtonContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', undefined, 'flex-end')};
  ${({ theme }) => theme.margin('4xl', 0, 0)};
`
