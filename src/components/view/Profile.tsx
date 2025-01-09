import type { PostAuthorType } from '@/types/post'
import type { MilitaryBranchCode } from '@/utils/constants'

import { ProfileImage } from './ProfileImage'

type BaseProfileProps = {
  iconType: MilitaryBranchCode
  name: string
  subtitle: string
  description: string
}

const BaseProfile = ({ iconType, name, subtitle, description }: BaseProfileProps) => (
  <div className="flex-align gap-4 border-b border-b-black-100 px-4 pb-3">
    <ProfileImage iconType={iconType} size="lg" />
    <div className="flex-column gap-[6px]">
      <div className="flex-align gap-3">
        <span className="p-600 text-black-600">{name}</span>
        <span className="p-800 text-blue-500">{subtitle}</span>
      </div>
      <p className="p-800 text-black-400">{description}</p>
    </div>
  </div>
)

type PostProfileProps = {
  profile: PostAuthorType
}

export const PostProfile = ({ profile }: PostProfileProps) => (
  <BaseProfile
    iconType={profile.militaryChaplain}
    name={profile.nickname}
    subtitle={`예비군 ${profile.dischargeYear}년차`}
    description={profile.createdAt}
  />
)

type ChattingRoomProfileProps = {
  opponent: string
  iconType: MilitaryBranchCode
  dischargeYear: number
  title: string
}

export const ChattingRoomProfile = ({
  opponent,
  iconType,
  dischargeYear,
  title,
}: ChattingRoomProfileProps) => (
  <BaseProfile
    iconType={iconType}
    name={opponent}
    subtitle={`예비군 ${dischargeYear}년차`}
    description={title}
  />
)

type ChattingProfileProps = {
  iconType: MilitaryBranchCode
  opponent: string
  title: string
  lastMessage: string
  lastMessageDaysAgo: string
}

export const ChattingProfile = ({
  iconType,
  opponent,
  title,
  lastMessage,
  lastMessageDaysAgo,
}: ChattingProfileProps) => (
  <div className="flex-align w-full gap-4 border-b border-b-grey-200 px-4 pb-3">
    <ProfileImage iconType={iconType} size="lg" />
    <div className="flex-column min-w-0 grow gap-[6px]">
      <div className="flex-align min-w-0 grow gap-3">
        <h6 className="shrink-0 font-bold">{opponent}</h6>
        <p className="p-small min-w-0 truncate text-blue-500">{title}</p>
      </div>
      <p className="p-small grow truncate text-grey-700">{lastMessage}</p>
    </div>
    <p className="p-xsmall ml-auto shrink-0 text-grey-500">{lastMessageDaysAgo}</p>
  </div>
)
