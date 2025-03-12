import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

import carBlack from '/assets/icons/CarBlack.svg'
import carWhite from '/assets/icons/CarWhite.svg'

export const HomeServiceSection = () => {
  return (
    <ServiceSection>
      <h4 className="title">어떤 서비스를 찾고 있나요?</h4>

      <ServiceOptions>
        <LinkContainer to={'/board'}>
          <Label>{`같이 차 타고\n갈 사람 없을까?`}</Label>
          <img src={carWhite} alt="car-white" />
        </LinkContainer>

        <LinkContainer to={'/bus-application'} $primary>
          <Label $primary>{`버스 신청하러\n왔습니다!`}</Label>
          <img src={carBlack} alt="car-black" />
        </LinkContainer>
      </ServiceOptions>
    </ServiceSection>
  )
}

const ServiceSection = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'xl')}
    ${theme.padding('lg')}
    ${theme.boxShadow('sm')}
  `}
  background-color: white;

  .title {
    ${({ theme }) => theme.font(600, theme.colors.black[600])};
  }
`

const ServiceOptions = styled.ul`
  ${({ theme }) => theme.flexBox('row', undefined, undefined, 'lg')};
`

const LinkContainer = styled(Link)<{ $primary?: boolean }>`
  ${({ theme, $primary }) => `
    ${theme.borderRadius('sm')}
    background-color: ${$primary ? theme.colors.black[400] : theme.colors.black[100]};
  `}
  flex-grow: 1;
  position: relative;
  aspect-ratio: 1 / 1.2;

  & > img {
    width: 70%;
    height: 70%;
    position: absolute;
    bottom: -10px;
    right: 0;
  }

  &:hover {
    scale: 1.02;
    transition: all 0.2s;
  }
`

const Label = styled.p<{ $primary?: boolean }>`
  ${({ theme, $primary }) =>
    theme.font(700, $primary ? theme.colors.black[100] : theme.colors.black[600])}
  position: absolute;
  top: 32px;
  left: 12px;
  white-space: pre-wrap;
`
