import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { instance } from '@/query'
import { Button } from '@/shared/ui/Button'
import { TentIcon } from '@/shared/ui/icons/NonActiveIcons'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

const LoggedInUserContent = () => {
  const nickname = getSessionStorageItem(SESSION_KEYS.NICKNAME)

  return (
    <>
      <Text>{nickname}님 안녕하세요.</Text>
      <Text>
        <Logo>BROOM</Logo>에 오신걸 환영합니다.
      </Text>
    </>
  )
}

const LoggedOutUserContent = () => (
  <>
    <Text>
      <Logo>BROOM</Logo>에 가입하고
    </Text>
    <Text>다른 사람들을 모아보세요.</Text>
  </>
)

export const HomeUserSection = () => {
  const navigate = useNavigate()
  const session = instance.hasToken()

  const handleLogin = () => navigate('/login')
  const handleSignUp = () => navigate('/sign-up')

  return (
    <Section>
      <ContentContainer>
        <MainTextContainer>
          {session ? <LoggedInUserContent /> : <LoggedOutUserContent />}
        </MainTextContainer>
        <TentIcon />
      </ContentContainer>

      {!session && (
        <ButtonContainer>
          <StyledButton size="sm" onClick={handleLogin}>
            로그인
          </StyledButton>
          <StyledButton size="sm" secondary onClick={handleSignUp}>
            회원가입
          </StyledButton>
        </ButtonContainer>
      )}
    </Section>
  )
}

const Section = styled.section`
  ${({ theme }) => theme.boxShadow('sm')};
  ${({ theme }) => theme.padding('3xl', 'lg')};
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
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  ${({ theme }) => theme.font(700, theme.colors.black[500])};
`

const Logo = styled.span`
  font-family: 'Jalnan2', sans-serif;
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.black[600]};
`

const ButtonContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'md')};
  ${({ theme }) => theme.margin('container', 0, 0)};
  width: 100%;
`

const StyledButton = styled(Button)`
  flex-grow: 1;
`
