import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { useFetchUserProfile } from '@/entities/mypage/api/useMypage.query'
import { DeleteIdButton } from '@/features/delete-id/ui/DeleteIdButton'
import { LogoutButton } from '@/features/logout/ui/LogoutButton'
import { CustomerSupportSection } from '@/features/mypage/ui/CustomerSupportSection'
import { MypageMenuSection } from '@/features/mypage/ui/MypageMenuSection'
import { MypageProfile } from '@/features/mypage/ui/MypageProfile'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { EmptyMessage } from '@/shared/ui/Error'

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

        <ButtonContainer>
          <LogoutButton />
          <span className="divider" />
          <DeleteIdButton />
        </ButtonContainer>
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

const ButtonContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center')}
    ${theme.margin('mypage-button')}
    ${theme.padding(0, 'xs')}
  `}

  .divider {
    ${({ theme }) => theme.border('underline', 'right')};
    height: 100%;
  }
`
