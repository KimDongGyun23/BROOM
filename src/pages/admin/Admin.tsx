import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useFetchBusApplicantToggleState } from '@/entities/admin/api/useAdmin.query'
import { LogoutButton } from '@/features/logout/ui/LogoutButton'
import { LogoutModal } from '@/features/logout/ui/LogoutModal'
import { ToggleBusApplication } from '@/features/toggle-bus-application/ui/ToggleBusApplication'
import { ArrowRightIcon } from '@/shared/ui/icons/ActiveIcons'
import { Loading } from '@/shared/ui/Loading'
import { MainHeader } from '@/shared/ui/MainHeader'

import { ErrorPage } from '../home/ErrorPage'

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
  const { data: toggleState, isPending, isError } = useFetchBusApplicantToggleState()

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <>
      <MainHeader />
      <PageContent>
        <ToggleBusApplication initialToggleState={toggleState.activated} />
        <NavigationLink label="버스 신청 현황 조회" to="/kw/broom/bus" />
        <NavigationLink label="예비군 날짜 선택" to="/kw/broom/dates" />
        <NavigationLink label="운영 현황" to="/kw/broom/overview" />
      </PageContent>

      <ButtonContainer>
        <LogoutButton />
      </ButtonContainer>
      <LogoutModal />
    </>
  )
}

const PageContent = styled.main`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container')};
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
