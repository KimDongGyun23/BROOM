import styled from 'styled-components'

import { ModalLayout } from '@/components/view/modal/ModalLayout'
import { useModalActions } from '@/stores/modal'
import type { ChatSidebarInformationResponse } from '@/types/chat'

import { ChatParticipantList } from './ChatParticipantList'
import { ChatRoomExitButton } from './ChatRoomExitButton'

type ChatSidebarProps = {
  sidebarInformation: ChatSidebarInformationResponse | undefined
  isOpen: boolean
  onClose: VoidFunction
}

export const ChatSidebar = ({ sidebarInformation, isOpen, onClose }: ChatSidebarProps) => {
  const { closeSidebar } = useModalActions()

  if (!isOpen || !sidebarInformation) return null

  const participants = [sidebarInformation.author, ...sidebarInformation.participants]

  return (
    <ModalLayout id="chat-sidebar" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <Header>
          <h5 className="title">{sidebarInformation.boardTitle}</h5>
          <p className="training-date">훈련 날짜: {sidebarInformation.trainingDate}</p>
        </Header>

        <ParticipantSection>
          <p className="participant-count">현재 참여 인원 수 : {participants.length}명</p>
          <ChatParticipantList participantList={participants} />
        </ParticipantSection>

        <SidebarFooter>
          <ChatRoomExitButton />
          <CloseButton onClick={closeSidebar}>닫기</CloseButton>
        </SidebarFooter>
      </ModalContent>
    </ModalLayout>
  )
}

const ModalContent = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  ${({ theme }) => theme.padding('md', 0, 0)};
  position: absolute;
  right: 0;
  width: 80%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black[400]};
`

const Header = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xs')};
  ${({ theme }) => theme.margin(0, 'container')};
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
  ${({ theme }) => theme.margin(0, 'container')};
  ${({ theme }) => theme.padding('md', 0, 0)};
  flex-grow: 1;
  overflow: hidden;

  .participant-count {
    ${({ theme }) => theme.font(800, theme.colors.black[100])};
  }
`

const SidebarFooter = styled.div`
  ${({ theme }) => theme.gridBox('1fr 1fr', undefined, 'center')};
  ${({ theme }) => theme.font(800, theme.colors.black[100])};
  background-color: ${({ theme }) => theme.colors.black[500]};
`

const CloseButton = styled.button`
  ${({ theme }) => theme.padding('md', 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.black[100])};
  ${({ theme }) => theme.border('divider', 'left')};
`
