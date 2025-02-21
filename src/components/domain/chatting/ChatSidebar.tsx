import type { PropsWithChildren } from 'react'
import styled from 'styled-components'

import { CrownIcon } from '@/components/view/icons/NonActiveIcons'
import { ModalLayout } from '@/components/view/modal/ModalLayout'
import { ProfileImage } from '@/components/view/ProfileImage'
import type { MilitaryBranchCode } from '@/utils/constants'

type ModalBaseProps = {
  isOpen: boolean
  onClose: VoidFunction
}

const dummy = {
  boardTitle: '광운대 택시 출발',
  trainingDate: '2025/05/21',
  participants: [
    {
      userId: 'test2345',
      userNickname: 'test2',
      militaryBranch: 'ARMY',
      expelled: true,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
    {
      userId: 'test3456',
      userNickname: 'test3',
      militaryBranch: 'ARMY',
      expelled: false,
    },
  ],
}

export const ChatSidebar = ({ isOpen, onClose }: PropsWithChildren<ModalBaseProps>) => {
  if (!isOpen) return null

  const { boardTitle, trainingDate, participants } = dummy

  return (
    <ModalLayout id="chat-sidebar" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <Header>
          <h5 className="title">{boardTitle}</h5>
          <p className="training-date">훈련 날짜: {trainingDate}</p>
        </Header>

        <ParticipantSection>
          <p className="participant-title">현재 참여 인원 수 : {participants.length}명</p>

          <ParticipantList>
            {participants.map(({ userId, userNickname, militaryBranch, expelled }) => (
              <ParticipantItem key={userId}>
                <ProfileImage size="sm" iconType={militaryBranch as MilitaryBranchCode} />
                <ProfileInfo>
                  <p>{userNickname}</p>
                  <CrownIcon />
                </ProfileInfo>
                <ExpelButton>내보내기</ExpelButton>
              </ParticipantItem>
            ))}
          </ParticipantList>
        </ParticipantSection>
      </ModalContent>
    </ModalLayout>
  )
}

const ModalContent = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  ${({ theme }) => theme.padding('md', 'lg')};
  position: absolute;
  right: 0;
  width: 80%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black[400]};
`

const Header = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xs')};
  ${({ theme }) => theme.padding(0, 0, '2xl')};
  ${({ theme }) => theme.border('divider', 'bottom')};

  .title {
    ${({ theme }) => theme.font(400, theme.colors.black[100])};
  }

  .training-date {
    ${({ theme }) => theme.font(800, theme.colors.black[100])};
  }
`

const ParticipantSection = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.padding('md', 0, 0)};
  flex-grow: 1;
  overflow: hidden;

  .participant-count {
    ${({ theme }) => theme.font(800, theme.colors.black[100])};
  }
`

const ParticipantList = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.padding('md', 0)};
  flex-grow: 1;
  overflow-y: scroll;
`

const ParticipantItem = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')};
`

const ProfileInfo = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  ${({ theme }) => theme.font(800, theme.colors.black[100])};
  flex-grow: 1;
`

const ExpelButton = styled.button`
  ${({ theme }) => theme.padding('xs', 'sm')};
  ${({ theme }) => theme.font(900, theme.colors.orange)};
  ${({ theme }) => theme.borderRadius('md')};
  background-color: ${({ theme }) => theme.colors.black[100]};
`
