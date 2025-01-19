import styled from 'styled-components'

import type { PostAuthorType } from '@/types/post'
import type { MilitaryBranchCode } from '@/utils/constants'

import { ProfileImage } from './ProfileImage'

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.gap.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[100]};
  padding: 0 ${({ theme }) => `${theme.gap.xl} ${theme.gap.lg}`};
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.sm};
`

const NameSubtitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};

  .name {
    font-size: ${({ theme }) => theme.fontSize[600]};
    line-height: ${({ theme }) => theme.lineHeight[600]};
    color: ${({ theme }) => theme.colors.black[600]};
  }

  .subtitle {
    font-size: ${({ theme }) => theme.fontSize[800]};
    line-height: ${({ theme }) => theme.lineHeight[800]};
    color: ${({ theme }) => theme.colors.blue[500]};
  }
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize[800]};
  line-height: ${({ theme }) => theme.lineHeight[800]};
  color: ${({ theme }) => theme.colors.black[400]};
`

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
        <span className="name">{name}</span>
        <span className="subtitle">{subtitle}</span>
      </NameSubtitleContainer>
      <Description>{description}</Description>
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
