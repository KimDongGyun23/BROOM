import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { useUserProfile } from '@/features/mypage/api/useMypage.query'
import { DeleteIdButton } from '@/features/mypage/ui/DeleteIdButton'
import { DeleteIdModal } from '@/features/mypage/ui/DeleteIdModal'
import { LogoutButton } from '@/features/mypage/ui/LogoutButton'
import { LogoutModal } from '@/features/mypage/ui/LogoutModal'
import { MypageProfile } from '@/features/mypage/ui/MypageProfile'
import { MypageSections } from '@/features/mypage/ui/MypageSections'
import { ModalStoreProvider } from '@/shared/model/modal.type'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { Loading } from '@/shared/ui/Loading'

import { ErrorPage } from '../home/ErrorPage'

export const Mypage = () => {
  const { data: userProfile, isPending, isError } = useUserProfile()

  if (isPending) return <Loading />
  if (isError || !userProfile) return <ErrorPage />

  return (
    <ModalStoreProvider>
      <Container>
        <ScrollContainer>
          <MypageProfile {...userProfile} />
          <MypageSections />

          <ButtonContainer>
            <LogoutButton />
            <span className="divider" />
            <DeleteIdButton />
          </ButtonContainer>
        </ScrollContainer>

        <BottomNavigation />
      </Container>

      <LogoutModal />
      <DeleteIdModal />
    </ModalStoreProvider>
  )
}

const ScrollContainer = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  ${({ theme }) => theme.padding(0, 0, 'lg')};
  flex-grow: 1;
  overflow-y: scroll;
`

const ButtonContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center')};
  ${({ theme }) => theme.margin('mypage-button-top', 0, 0, 'auto')};
  ${({ theme }) => theme.padding(0, 'xs')};

  .divider {
    ${({ theme }) => theme.border('underline', 'right')};
    height: 100%;
  }
`
