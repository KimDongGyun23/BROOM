import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ArrowRightIcon } from '@/shared/ui/icons/ActiveIcons'
import { MainHeader } from '@/shared/ui/MainHeader'
import { LogoutButton } from '@/widgets/button/LogoutButton'

type NavigationLinkProps = {
  label: string
  to: string
}

const NavigationLink = ({ label, to }: NavigationLinkProps) => (
  <StyledLink to={to}>
    <p className="button-label">{label}</p>
    <ArrowRightIcon active />
  </StyledLink>
)

export const Admin = () => {
  return (
    <>
      <MainHeader />
      <PageContent>
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
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'xl')}
    ${theme.margin('container')}
  `}
`

const StyledLink = styled(Link)`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')}

  .button-label {
    ${({ theme }) => theme.font(700, theme.colors.black[600])}
  }
`

const ButtonContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', undefined, 'flex-end')}
    ${theme.margin('4xl', 0, 0)}
  `}
`
