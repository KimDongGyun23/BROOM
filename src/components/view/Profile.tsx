import type { MilitaryBranchCode } from '@/utils'

import { ProfileImage } from './ProfileImage'

type BaseProfileProps = {
  iconType: MilitaryBranchCode
  name: string
  subtitle: string
  description: string
}

const BaseProfile = ({ iconType, name, subtitle, description }: BaseProfileProps) => (
  <div className="flex-align gap-4 border-b border-b-grey-200 px-4 pb-3">
    <ProfileImage iconType={iconType} size="lg" />
    <div className="flex-column gap-[6px]">
      <div className="flex-align gap-3">
        <h6 className="font-bold">{name}</h6>
        <p className="p-small text-blue-500">{subtitle}</p>
      </div>
      <p className="p-small text-grey-500">{description}</p>
    </div>
  </div>
)

type PostProfileProps = {
  nickname: string
  iconType: MilitaryBranchCode
  dischargeYear: number
  createdAt: string
}

export const PostProfile = ({ nickname, iconType, dischargeYear, createdAt }: PostProfileProps) => (
  <BaseProfile
    iconType={iconType}
    name={nickname}
    subtitle={`예비군 ${dischargeYear}년차`}
    description={createdAt}
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
