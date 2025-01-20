import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { TentIcon } from '@/components/view/icons/NonActiveIcons'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

const Section = styled.section`
  background-color: white;
  padding: 28px ${({ theme }) => theme.gap.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
`

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`

const MainTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: ${({ theme }) => theme.gap.xs};
`

const Text = styled.p`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.gap.xs};
  font-size: ${({ theme }) => theme.fontSize[700]};
  line-height: ${({ theme }) => theme.lineHeight[700]};
  color: ${({ theme }) => theme.colors.black[500]};
`

const Logo = styled.span`
  font-family: 'jalnan', sans-serif;
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.black[600]};
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.gap.xl};
  width: 100%;
  gap: ${({ theme }) => theme.gap.lg};
`

const StyledButton = styled(Button)`
  flex-grow: 1;
`

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
  const session = !!getSessionStorageItem(SESSION_KEYS.LOGIN)

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
