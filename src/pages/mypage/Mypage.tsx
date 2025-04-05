import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { useFetchUserProfile } from '@/entities/mypage/api/useMypage.query'
import { CustomerSupportSection } from '@/features/mypage/ui/CustomerSupportSection'
import { MypageMenuSection } from '@/features/mypage/ui/MypageMenuSection'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { EmptyMessage } from '@/shared/ui/Error'
import { AuthenticationSection } from '@/widgets/AuthenticationSection'
import { MypageProfile } from '@/widgets/MypageProfile'

export const Mypage = () => {
  const { data: userProfile } = useFetchUserProfile()

  if (!userProfile) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  return (
    <Container>
      <ScrollContainer>
        <MypageProfile {...userProfile} />
        <MenuContainer>
          <MypageMenuSection />
          <CustomerSupportSection />
        </MenuContainer>

        <AuthenticationSection />
      </ScrollContainer>

      <BottomNavigation />
    </Container>
  )
}

const ScrollContainer = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  ${({ theme }) => theme.padding(0, 0, 'lg')};
  flex-grow: 1;
  overflow-y: scroll;
`

const MenuContainer = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('column')}
    ${theme.margin(0, 'container')}
  `}
`
