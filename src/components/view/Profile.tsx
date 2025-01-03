import type { ChattingListProfileType } from '@/types'
import type { PostAuthorType } from '@/types/post'

import { ProfileImage } from './ProfileImage'

type PostProfileProps = {
  profile: PostAuthorType
}

type ChattingProfileProps = {
  profile: ChattingListProfileType
}

export const PostProfile = ({ profile }: PostProfileProps) => {
  const { nickname, militaryChaplain, dischargeYear, createdAt } = profile

  return (
    <div className="flex-align gap-4 border-b border-b-grey-2 px-4 pb-3">
      <ProfileImage iconType={militaryChaplain} size="lg" />
      <div className="flex-column gap-[6px]">
        <div className="flex-align gap-3">
          <h6 className="font-bold">{nickname}</h6>
          <p className="p-small text-blue-5">예비군 {dischargeYear}년차</p>
        </div>
        <p className="p-small text-grey-5">{createdAt}</p>
      </div>
    </div>
  )
}

export const ChattingProfile = ({ profile }: ChattingProfileProps) => {
  const { militaryChaplain, opponent, title, lastMessage, lastMessageDaysAgo } = profile

  return (
    <div className="flex-align w-full gap-4 border-b border-b-grey-2 px-4 pb-3">
      <ProfileImage iconType={militaryChaplain} size="lg" />
      <div className="flex-column min-w-0 grow gap-[6px]">
        <div className="flex-align min-w-0 grow gap-3">
          <h6 className="shrink-0 font-bold">{opponent}</h6>
          <p className="p-small min-w-0 truncate text-blue-5">{title}</p>
        </div>
        <p className="p-small grow truncate text-grey-7">{lastMessage}</p>
      </div>
      <p className="p-xsmall ml-auto shrink-0 text-grey-5">{lastMessageDaysAgo}</p>
    </div>
  )
}
