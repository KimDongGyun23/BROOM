import { Fragment } from 'react/jsx-runtime'
import { Link, useNavigate } from 'react-router-dom'

import chainImage from '@/assets/chain.svg'
import { BottomNav } from '@/components/view'
import { Loading } from '@/components/view/Loading'
import { ProfileImage } from '@/components/view/ProfileImage'
import { useLogout, useUserDeletion, useUserProfile } from '@/services/query'
import type { IconType } from '@/types'
import {
  clearSessionStorage,
  getSessionStorageItem,
  MYPAGE_PROFILE_SECTIONS,
  SESSION_MILITARY_CHAPLAIN,
} from '@/utils'

type ProfileSectionProps = {
  title: string
  items: readonly { name: string; path: string }[]
}

type UserProfileProps = {
  username: string
  serviceYear: number
  iconType: IconType | null
}

const UserProfile = ({ username, serviceYear, iconType }: UserProfileProps) => (
  <div className="flex-align relative mx-auto mb-[30px] mt-4 w-fit gap-5 rounded-[40px] border-[10px] border-grey-200 py-[14px] pl-[18px] pr-[30px]">
    <img src={chainImage} className="absolute -left-7 bottom-5" alt="chain" />
    <ProfileImage iconType={iconType} size="lg" />
    <div className="flex-column">
      <p className="p-medium font-medium">{username}</p>
      <p className="p-xsmall text-blue-700">예비군 {serviceYear}년차</p>
    </div>
  </div>
)

const ProfileSection = ({ title, items }: ProfileSectionProps) => (
  <section className="flex-column gap-5">
    <h6 className="font-bold text-grey-700">{title}</h6>
    <ul className="flex-column gap-3">
      {items.map(({ name, path }) => (
        <li key={name}>
          <Link to={path} className="p-medium text-grey-700">
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

export const Mypage = () => {
  const navigate = useNavigate()
  const iconType = getSessionStorageItem(SESSION_MILITARY_CHAPLAIN) as IconType | null
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
    <div className="flex-column h-full">
      <div className="flex-column scroll">
        <UserProfile username={nickname} serviceYear={dischargeYear} iconType={iconType} />

        <div className="flex-column mx-4 mb-6 gap-7">
          {MYPAGE_PROFILE_SECTIONS.map(({ title, items }, index) => (
            <Fragment key={title}>
              <ProfileSection title={title} items={items} />
              {index !== MYPAGE_PROFILE_SECTIONS.length - 1 && <hr className="bg-grey-200" />}
            </Fragment>
          ))}

          <div className="flex-align ml-auto mt-[3svh] px-1">
            <button
              className="p-small border-r border-r-grey-400 px-4 text-grey-600"
              onClick={handleLogout}
            >
              로그아웃
            </button>
            <button className="p-small px-4 text-red-200" onClick={handleAccountDeletion}>
              회원탈퇴
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
