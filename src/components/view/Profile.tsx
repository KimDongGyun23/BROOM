import styled from 'styled-components'

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

const ProfileContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.xl)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[100]};
  padding: 0 ${({ theme }) => `${theme.gap.xl} ${theme.gap.lg}`};
`

const ProfileInfo = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, theme.gap.sm)};

  .profile-description {
    ${({ theme }) => theme.font(800, theme.colors.black[400])};
  }
`

const NameSubtitleContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.lg)};

  .profile-name {
    ${({ theme }) => theme.font(600, theme.colors.black[600])};
  }

  .profile-subtitle {
    ${({ theme }) => theme.font(800, theme.colors.blue[500])};
  }
`
