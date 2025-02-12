import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const MainHeader = () => {
  return (
    <HeaderContainer>
      <Link to={'/home'}>
        <LogoText>BROOM</LogoText>
      </Link>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  ${({ theme }) => theme.flexBox('row', 'center', 'flex-end')};
  ${({ theme }) => theme.margin(0, 'container')};
  ${({ theme }) => theme.padding(0, 'lg')};
  position: relative;
  height: 80px;
  flex-shrink: 0;
`

const LogoText = styled.h1`
  font-family: 'jalnan', sans-serif;
  font-size: 32px;
  line-height: 36px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black[600]};
`
