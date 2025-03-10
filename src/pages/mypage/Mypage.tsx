import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { useUserProfile } from '@/entities/mypage/api/useMypage.query'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { EmptyMessage } from '@/shared/ui/Error'
import { MypageAuthSection } from '@/widgets/mypage-auth/ui/MypageAuthSection'
import { MypageProfile } from '@/widgets/mypage-main/ui/MypageProfile'
import { MypageSections } from '@/widgets/mypage-main/ui/MypageSections'

export const Mypage = () => {
  const { data: userProfile } = useUserProfile()

  if (!userProfile) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  return (
    <Container>
      <ScrollContainer>
        <MypageProfile {...userProfile} />
        <MypageSections />
        <MypageAuthSection />
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
