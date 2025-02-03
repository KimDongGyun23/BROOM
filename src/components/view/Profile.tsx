import styled from 'styled-components'

import { usePost } from '@/stores/post'
import type { MilitaryBranchCode } from '@/utils/constants'

import { ProfileImage } from './ProfileImage'

type BaseProfileProps = {
  iconType: MilitaryBranchCode
  name: string
  subtitle: string
  description: string
}

const BaseProfile = ({ iconType, name, subtitle, description }: BaseProfileProps) => (
  <ProfileContainer>
    <ProfileImage iconType={iconType} size="lg" />
    <ProfileInfo>
      <NameSubtitleContainer>
        <span className="profile-name">{name}</span>
        <span className="profile-subtitle">{subtitle}</span>
      </NameSubtitleContainer>
      <p className="profile-description">{description}</p>
    </ProfileInfo>
  </ProfileContainer>
)

export const PostProfile = () => {
  const post = usePost()
  if (!post || !post.author) return null

  return (
    <BaseProfile
      iconType={post.author.militaryBranch}
      name={post.author.nickname}
      subtitle={`예비군 ${post.author.reserveYear}년차`}
      description={post.status.createdAt}
    />
  )
}

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

const ProfileContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'lg')};
  ${({ theme }) => theme.margin(0, 'container')};
  ${({ theme }) => theme.padding(0, 0, 'lg')};
  ${({ theme }) => theme.border('divider', 'bottom')};
`

const ProfileInfo = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'sm')};

  .profile-description {
    ${({ theme }) => theme.font(800, theme.colors.black[400])};
  }
`

const NameSubtitleContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'md')};

  .profile-name {
    ${({ theme }) => theme.font(600, theme.colors.black[600])};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .profile-subtitle {
    ${({ theme }) => theme.font(800, theme.colors.blue[500])};
    flex-shrink: 0;
  }
`
