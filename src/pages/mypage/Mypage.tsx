import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { useUserProfile } from '@/entities/mypage/api/useMypage.query'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { EmptyMessage } from '@/shared/ui/Error'
import { MypageProfile } from '@/widgets/profile/MypageProfile'
import { MypageAuthSection } from '@/widgets/section/MypageAuthSection'
import { MypageSections } from '@/widgets/section/MypageSections'

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
