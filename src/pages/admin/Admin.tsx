import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { LogoutButton } from '@/features/logout/ui/LogoutButton'
import { LogoutModal } from '@/features/logout/ui/LogoutModal'
import { ModalStoreProvider } from '@/shared/model/modal.store'
import { ArrowRightIcon } from '@/shared/ui/icons/ActiveIcons'
import { MainHeader } from '@/shared/ui/MainHeader'
import { ToggleButton } from '@/shared/ui/ToggleButton'

type NavigationLink = {
  label: string
  to: string
}

const NavigationLink = ({ label, to }: NavigationLink) => {
  return (
    <StyledLink to={to}>
      <p className="button-label">{label}</p>
      <ArrowRightIcon active />
    </StyledLink>
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
        <NavigationLink label="버스 신청 현황 조회" to="/kw/broom/bus" />
        <NavigationLink label="예비군 날짜 선택" to="/kw/broom/dates" />
        <NavigationLink label="운영 현황" to="/kw/broom/overview" />
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

const StyledLink = styled(Link)`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')};

  .button-label {
    ${({ theme }) => theme.font(700, theme.colors.black[600])};
  }
`

const ButtonContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', undefined, 'flex-end')};
  ${({ theme }) => theme.margin('4xl', 0, 0)};
`
