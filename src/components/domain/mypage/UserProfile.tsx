import styled from 'styled-components'

import chainImage from '@/assets/chain.svg'
import { ProfileImage } from '@/components/view/ProfileImage'
import type { MilitaryBranchCode } from '@/utils/constants'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

type UserProfileProps = {
  nickname: string
  reserveYear: number
}

export const UserProfile = ({ nickname, reserveYear }: UserProfileProps) => {
  const iconType = getSessionStorageItem(
    SESSION_KEYS.MILITARY_BRANCHES,
  ) as MilitaryBranchCode | null

  return (
    <UserProfileContainer>
      <ChainImage src={chainImage} alt="chain" />
      <ProfileImage iconType={iconType} size="lg" />
      <UserInfoContainer>
        <p className="name">{nickname}</p>
        <p className="year">예비군 {reserveYear}년차</p>
      </UserInfoContainer>
    </UserProfileContainer>
  )
}

const UserProfileContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xl')};
  ${({ theme }) => theme.margin('container', 'auto', 'xl')};
  ${({ theme }) => theme.padding('chain')};
  ${({ theme }) => theme.border('chain')};
  ${({ theme }) => theme.borderRadius('chain')};
  position: relative;
  width: fit-content;
`

const ChainImage = styled.img`
  width: fit-content;
  height: fit-content;
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
