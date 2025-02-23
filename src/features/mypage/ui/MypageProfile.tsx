import styled from 'styled-components'

import type { MypageProfileResponse } from '@/features/mypage/model/mypage.type'
import { ChainIcon } from '@/shared/ui/icons/NonActiveIcons'
import { ProfileImage } from '@/shared/ui/ProfileImage'

export const MypageProfile = ({ nickname, militaryBranch, reserveYear }: MypageProfileResponse) => {
  return (
    <Container>
      <ChainContainer>
        <ChainIcon />
      </ChainContainer>

      <ProfileImage iconType={militaryBranch} size="lg" />

      <UserInfoContainer>
        <p className="name">{nickname}</p>
        <p className="year">예비군 {reserveYear}년차</p>
      </UserInfoContainer>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xl')};
  ${({ theme }) => theme.margin('container', 'auto', 'xl')};
  ${({ theme }) => theme.padding('chain')};
  ${({ theme }) => theme.border('chain')};
  ${({ theme }) => theme.borderRadius('chain')};
  position: relative;
  width: fit-content;
`

const ChainContainer = styled.div`
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
