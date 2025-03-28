import styled from 'styled-components'

import type { MypageProfileResponse } from '@/entities/mypage/model/mypage.type'
import { ChainIcon } from '@/shared/ui/icons/NonActiveIcons'
import { ProfileImage } from '@/shared/ui/ProfileImage'

export const MypageProfile = ({ nickname, militaryBranch, reserveYear }: MypageProfileResponse) => {
  return (
    <Container>
      <ChainIconContainer>
        <ChainIcon />
      </ChainIconContainer>

      <ProfileImage iconType={militaryBranch} size="lg" />

      <UserInfoContainer>
        <p className="name">{nickname}</p>
        <p className="year">예비군 {reserveYear}년차</p>
      </UserInfoContainer>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', undefined, 'xl')}
    ${theme.margin('container', 'auto', 'xl')}
    ${theme.padding('chain')}
    ${theme.border('chain')}
    ${theme.borderRadius('chain')}
  `}
  position: relative;
  width: fit-content;
`

const ChainIconContainer = styled.div`
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
