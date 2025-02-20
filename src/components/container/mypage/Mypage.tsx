import styled from 'styled-components'

import { DeleteIdButton } from '@/components/domain/mypage/DeleteIdButton'
import { DeleteIdModal } from '@/components/domain/mypage/DeleteIdModal'
import { LogoutButton } from '@/components/domain/mypage/LogoutButton'
import { LogoutModal } from '@/components/domain/mypage/LogoutModal'
import { MypageProfile } from '@/components/domain/mypage/MypageProfile'
import { MypageSections } from '@/components/domain/mypage/MypageSections'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { Loading } from '@/components/view/Loading'
import { useUserProfile } from '@/query/useMypageQuery'
import { ModalStoreProvider } from '@/stores/modal'
import { Container } from '@/styles/commonStyles'

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
