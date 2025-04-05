import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useIsLoggedIn, useUserData } from '@/features/login/model/auth.store'
import { Button } from '@/shared/ui/Button'
import { TentIcon } from '@/shared/ui/icons/NonActiveIcons'

export const HomeUserSection = () => {
  const isLoggedIn = useIsLoggedIn()
  const navigate = useNavigate()
  const user = useUserData()

  return (
    <UserSection>
      <ContentContainer>
        <MainTextContainer>
          {isLoggedIn ? (
            <>
              <Text>{user?.nickname}님 안녕하세요.</Text>
              <Text>
                <Logo>BROOM</Logo>에 오신걸 환영합니다.
              </Text>
            </>
          ) : (
            <>
              <Text>
                <Logo>BROOM</Logo>에 가입하고
              </Text>
              <Text>다른 사람들을 모아보세요.</Text>
            </>
          )}
        </MainTextContainer>
        <TentIcon />
      </ContentContainer>

      {!isLoggedIn && (
        <ButtonContainer>
          <StyledButton size="sm" onClick={() => navigate('/login')}>
            로그인
          </StyledButton>

          <StyledButton size="sm" secondary onClick={() => navigate('/sign-up')}>
            회원가입
          </StyledButton>
        </ButtonContainer>
      )}
    </UserSection>
  )
}

const UserSection = styled.section`
  ${({ theme }) => `
    ${theme.boxShadow('sm')}
    ${theme.padding('3xl', 'lg')}
  `}
  background-color: white;
`

const ContentContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center')};
`

const MainTextContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xs')};
  flex-grow: 1;
`

const Text = styled.p`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', undefined, 'xs')}
    ${theme.font(700, theme.colors.black[500])}
  `}
`

const Logo = styled.span`
  font-family: 'Jalnan', sans-serif;
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.black[600]};
`

const ButtonContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', undefined, 'md')}
    ${theme.margin('container', 0, 0)}
  `}
  width: 100%;
`

const StyledButton = styled(Button)`
  flex-grow: 1;
`
