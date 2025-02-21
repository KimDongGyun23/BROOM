import styled from 'styled-components'

import { ProfileImage } from '@/components/view/ProfileImage'
import type { MilitaryBranchCode } from '@/utils/constants'

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
  ${({ theme }) => theme.gridBox('1fr 1fr', '1fr 1fr', 'center', 'center')};
  ${({ theme }) => theme.border('box')};
  ${({ theme }) => theme.borderRadius('md')};
  width: 60px;
  height: 60px;
  padding: 2.4px;
`
