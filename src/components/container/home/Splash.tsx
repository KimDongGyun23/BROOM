import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.black[600]};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.gap.md};
`

const Logo = styled.h1`
  font-family: 'jalnan', sans-serif;
  font-size: 64px;
  color: ${({ theme }) => theme.colors.black[100]};
`

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize[700]};
  line-height: ${({ theme }) => theme.lineHeight[700]};
  color: ${({ theme }) => theme.colors.black[200]};
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
