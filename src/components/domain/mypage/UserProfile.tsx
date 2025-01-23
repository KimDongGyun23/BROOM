import styled from 'styled-components'

import chainImage from '@/assets/chain.svg'
import { ProfileImage } from '@/components/view/ProfileImage'
import type { MilitaryBranchCode } from '@/utils/constants'

type UserProfileProps = {
  username: string
  serviceYear: number
  iconType: MilitaryBranchCode | null
}

export const UserProfile = ({ username, serviceYear, iconType }: UserProfileProps) => (
  <UserProfileContainer>
    <ChainImage src={chainImage} alt="chain" />
    <ProfileImage iconType={iconType} size="lg" />
    <UserInfoContainer>
      <p className="name">{username}</p>
      <p className="year">예비군 {serviceYear}년차</p>
    </UserInfoContainer>
  </UserProfileContainer>
)

const UserProfileContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xl')};
  ${({ theme }) => theme.margin('container', 'auto', 'xl')};
  ${({ theme }) => theme.border('chain')};
  ${({ theme }) => theme.borderRadius('chain')};
  position: relative;
  width: fit-content;
`

const ChainImage = styled.img`
  position: absolute;
  left: -28px;
  bottom: 20px;
`

const UserInfoContainer = styled.div`
  ${({ theme }) => theme.flexBox('column')};

  .name {
    ${({ theme }) => theme.font(700, theme.colors.black[600])};
  }

  .year {
    ${({ theme }) => theme.font(900, theme.colors.black[500])};
  }
`
