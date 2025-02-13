import styled from 'styled-components'

import { DeleteUserButton } from '@/components/domain/mypage/DeleteUserButton'
import { LogoutButton } from '@/components/domain/mypage/LogoutButton'
import { MypageContents } from '@/components/domain/mypage/MypageContents'
import { UserProfile } from '@/components/domain/mypage/UserProfile'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { Loading } from '@/components/view/Loading'
import { useUserProfile } from '@/query/useMypageQuery'
import { Container } from '@/styles/commonStyles'

import { ErrorPage } from '../home/ErrorPage'

const MYPAGE_PROFILE_SECTIONS = [
  {
    title: '내 정보',
    items: [
      { name: '계정 정보', path: '/mypage/account-info' },
      { name: '비밀번호 재설정', path: '/mypage/password' },
    ],
  },
  {
    title: '게시글',
    items: [
      { name: '내가 올린 게시글', path: '/mypage/myboard' },
      { name: '북마크', path: '/mypage/bookmark' },
    ],
  },
  {
    title: '고객 지원',
    items: [
      { name: '문의하기', path: '/mypage' },
      { name: '서비스 정보', path: '/mypage' },
    ],
  },
] as const

export const Mypage = () => {
  const { data: userProfile, isPending, isError } = useUserProfile()

  if (isPending) return <Loading />
  if (isError || !userProfile) return <ErrorPage />

  return (
    <Container>
      <ScrollContainer>
        <UserProfile nickname={userProfile.nickname} reserveYear={userProfile.reserveYear} />

        <Section>
          {MYPAGE_PROFILE_SECTIONS.map(({ title, items }, index) => (
            <MypageContents
              key={title}
              title={title}
              items={items}
              isLast={index === MYPAGE_PROFILE_SECTIONS.length - 1}
            />
          ))}
        </Section>

        <ActionContainer>
          <LogoutButton />
          <DeleteUserButton />
        </ActionContainer>
      </ScrollContainer>

      <BottomNavigation />
    </Container>
  )
}

const ScrollContainer = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  flex-grow: 1;
  overflow-y: scroll;
`

const Section = styled.section`
  ${({ theme }) => theme.flexBox('column')};
  ${({ theme }) => theme.margin(0, 'container')};
`

const ActionContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center')};
  ${({ theme }) => theme.margin('mypage-button-top', 0, 0, 'auto')};
  ${({ theme }) => theme.padding(0, 'xs')};
`
