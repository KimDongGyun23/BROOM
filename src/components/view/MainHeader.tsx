import { Link } from 'react-router-dom'
import styled from 'styled-components'

import type { MilitaryBranchCode } from '@/utils/constants'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

import { ProfileImage } from './ProfileImage'

export const MainHeader = () => {
  const iconType =
    (getSessionStorageItem(SESSION_KEYS.MILITARY_CHAPLAIN) as MilitaryBranchCode) || null
  const session = !!getSessionStorageItem(SESSION_KEYS.LOGIN)

  return (
    <HeaderContainer>
      <LogoLink to={'/home'}>
        <LogoText>BROOM</LogoText>
      </LogoLink>

      {session && iconType && (
        <ProfileLink to={'/mypage'}>
          <ProfileImage iconType={iconType} size="md" />
        </ProfileLink>
      )}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')};
  ${({ theme }) => theme.margin(0, 'container', 0, 'container')};
  ${({ theme }) => theme.padding(0, 'lg', 0, 'lg')};
  position: relative;
  height: 80px;
`

const LogoLink = styled(Link)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const LogoText = styled.h1`
  font-family: 'jalnan', sans-serif;
  font-size: 32px;
  line-height: 36px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black[600]};
`

const ProfileLink = styled(Link)`
  cursor: pointer;
`
