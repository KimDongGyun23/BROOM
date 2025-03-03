import styled from 'styled-components'

type MainHeaderProps = {
  title?: string
  secondary?: boolean
}

export const MainHeader = ({ title, secondary = false }: MainHeaderProps) => {
  return (
    <Container $secondary={secondary}>
      <HeaderTitle $secondary={secondary}>{secondary && title ? title : 'BROOM'}</HeaderTitle>
    </Container>
  )
}

const Container = styled.header<{ $secondary: boolean }>`
  ${({ theme, $secondary }) => `
    ${theme.flexBox('row', 'center', $secondary ? 'flex-start' : 'center')}
    ${theme.padding(0, 'lg')}
  `}
  position: relative;
  height: 80px;
  flex-shrink: 0;
`

const HeaderTitle = styled.h1<{ $secondary: boolean }>`
  ${({ theme, $secondary }) => `
    font-size: ${$secondary ? '28px' : '32px'};
    color: ${theme.colors.black[600]};
  `}
  font-family: 'Jalnan2', sans-serif;
  line-height: 36px;
`
