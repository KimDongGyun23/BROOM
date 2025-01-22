import { Fragment } from 'react/jsx-runtime'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { ProfileSection } from '@/components/domain/mypage/ProfileSection'
import { UserProfile } from '@/components/domain/mypage/UserProfile'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { Loading } from '@/components/view/Loading'
import { useLogout, useUserDeletion, useUserProfile } from '@/services/query/useMypageQuery'
import type { MilitaryBranchCode } from '@/utils/constants'
import { clearSessionStorage, getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

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
  const navigate = useNavigate()
  const iconType = getSessionStorageItem(
    SESSION_KEYS.MILITARY_CHAPLAIN,
  ) as MilitaryBranchCode | null
  const { data: userProfileData, isPending, isError } = useUserProfile()
  const { mutate: logoutMutation } = useLogout()
  const { mutate: deleteUser } = useUserDeletion()

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        clearSessionStorage()
        navigate('/login')
      },
    })
  }

  const handleAccountDeletion = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        clearSessionStorage()
        navigate('/login')
      },
    })
  }

  if (isPending || isError) return <Loading />

  const { nickname, dischargeYear } = userProfileData

  return (
    <Container>
      <ScrollContainer>
        <UserProfile username={nickname} serviceYear={dischargeYear} iconType={iconType} />

        <ContentContainer>
          {MYPAGE_PROFILE_SECTIONS.map(({ title, items }, index) => (
            <Fragment key={title}>
              <ProfileSection title={title} items={items} />
              {index !== MYPAGE_PROFILE_SECTIONS.length - 1 && <Divider />}
            </Fragment>
          ))}

          <ActionContainer>
            <ActionButton onClick={handleLogout} $isLogout>
              로그아웃
            </ActionButton>
            <ActionButton onClick={handleAccountDeletion}>회원탈퇴</ActionButton>
          </ActionContainer>
        </ContentContainer>
      </ScrollContainer>

      <BottomNavigation />
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

const ScrollContainer = styled.div`
  flex-direction: column;
  overflow-y: scroll;
`

const ContentContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xxl')};
  ${({ theme }) => theme.margin(0, 'container', 'container', 'container')};
`

const Divider = styled.hr`
  background-color: ${({ theme }) => theme.colors.black[200]};
`

const ActionContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center')};
  ${({ theme }) => theme.margin('mypage-button-top', 'auto', 0, 'auto')};
  ${({ theme }) => theme.padding(0, 'xs', 0, 'xs')};
`

const ActionButton = styled.button<{ $isLogout?: boolean }>`
  ${({ theme }) => theme.padding(0, 'lg', 0, 'lg')};
  ${({ theme, $isLogout }) =>
    theme.font(800, $isLogout ? theme.colors.black[600] : theme.colors.error)};
  border-right: ${({ theme, $isLogout }) =>
    $isLogout ? `1px solid ${theme.colors.black[400]}` : 'none'};
`
