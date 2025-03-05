import styled from 'styled-components'

import type { MilitaryBranchCode } from '@/shared/lib/constants'
import { ProfileImage } from '@/shared/ui/ProfileImage'

type ChattingProfileImageBoxProps = {
  profileIconList: MilitaryBranchCode[]
}

export const ChatProfileImageBox = ({ profileIconList }: ChattingProfileImageBoxProps) => {
  return (
    <Container>
      {profileIconList
        ?.slice(0, 4)
        .map((profileIcon, index) => <ProfileImage key={index} size="xs" iconType={profileIcon} />)}
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => `
    ${theme.gridBox('1fr 1fr', '1fr 1fr', 'center', 'center')}
    ${theme.border('box')}
    ${theme.borderRadius('md')}
  `}
  width: 60px;
  height: 60px;
  padding: 2.4px;
`
