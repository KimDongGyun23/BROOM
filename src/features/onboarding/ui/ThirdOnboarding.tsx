import styled from 'styled-components'

import { ProfileImage } from '@/shared/ui/ProfileImage'

export const ThirdOnboarding = () => {
  return (
    <Container>
      <ImageContainer>
        <div className="first-row">
          <ProfileImage size="lg" iconType="NAVY" />
        </div>
        <div className="second-row">
          <ProfileImage size="lg" iconType="MARINE" />
          <ProfileImage size="lg" iconType="ARMY" />
        </div>
        <div className="third-row">
          <ProfileImage size="lg" iconType="ETC" />
          <ProfileImage size="lg" iconType="AIRFORCE" />
        </div>
      </ImageContainer>

      <TextContainer>
        <p>
          <span>서비스를 이용하러 가볼까요?</span>
        </p>
        <p>가입하지 않아도 게시글 조회나 버스 신청이 가능합니다.</p>
      </TextContainer>
    </Container>
  )
}

const Container = styled.div``

const ImageContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, 'center', 'sm')}
  width: 230px;
  margin: 0 auto;

  .first-row {
    ${({ theme }) => theme.flexBox('row', 'center', 'center')}
    margin-top: -10px;
  }

  .second-row {
    ${({ theme }) => theme.flexBox('row', 'center', 'space-between')}
  }

  .third-row {
    ${({ theme }) => theme.flexBox('row', 'center', 'space-around')}
    padding: 10px;
  }
`

const TextContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('column', 'center', 'center', 'md')}
    ${theme.font(800, theme.colors.black[500])}
  `}

  margin-top: 15%;

  & span {
    ${({ theme }) => theme.font(500, theme.colors.blue[500])}
  }
`
