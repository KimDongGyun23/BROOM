import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { useUserProfile } from '@/entities/mypage/api/useMypage.query'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { Loading } from '@/shared/ui/Loading'
import { MypageAuthSection } from '@/widgets/mypage-auth/ui/MypageAuthSection'
import { MypageProfile } from '@/widgets/mypage-main/ui/MypageProfile'
import { MypageSections } from '@/widgets/mypage-main/ui/MypageSections'

import { ErrorPage } from '../home/ErrorPage'

export const Mypage = () => {
  const { data: userProfile, isPending, isError } = useUserProfile()

  if (isPending) return <Loading />
  if (isError || !userProfile) return <ErrorPage />

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
