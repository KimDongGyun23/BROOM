import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useFetchBusApplicantToggleState } from '@/entities/admin/api/useAdmin.query'
import { LogoutButton } from '@/features/logout/ui/LogoutButton'
import { BusApplicationToggle } from '@/features/toggle-bus-application/ui/BusApplicationToggle'
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
        <ToggleContainer>
          <BusApplicationLabel>버스 신청 활성화</BusApplicationLabel>
          <BusApplicationToggle isToggled={toggleState.activated} />
        </ToggleContainer>

        <NavigationLink label="버스 신청 현황 조회" to="/kw/broom/bus" />
        <NavigationLink label="예비군 날짜 선택" to="/kw/broom/dates" />
        <NavigationLink label="운영 현황" to="/kw/broom/overview" />
      </PageContent>

      <ButtonContainer>
        <LogoutButton />
      </ButtonContainer>
    </>
  )
}

const PageContent = styled.main`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container')};
`

const ToggleContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')};
`

const BusApplicationLabel = styled.div`
  ${({ theme }) => theme.font(700, theme.colors.black[600])};
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
