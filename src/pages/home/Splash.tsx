import styled from 'styled-components'

const Container = styled.div`
  ${({ theme }) => theme.gridBox(undefined, undefined, 'center', 'center')};
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black[600]};
`

const Content = styled.div`
  ${({ theme }) => theme.flexBox('column', 'center', undefined, 'sm')};
`

const Logo = styled.h1`
  font-family: 'Jalnan2', sans-serif;
  font-size: 64px;
  color: ${({ theme }) => theme.colors.black[100]};
`

const Subtitle = styled.p`
  ${({ theme }) => theme.font(700, theme.colors.black[200])};
`

export const Splash = () => {
  return (
    <Container>
      <Content>
        <Logo>BROOM</Logo>
        <Subtitle>광운대학교 예비군 종합 서비스</Subtitle>
      </Content>
    </Container>
  )
}
