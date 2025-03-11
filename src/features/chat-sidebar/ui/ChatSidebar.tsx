import styled from 'styled-components'

import { ChatParticipantList } from '@/features/chat-sidebar/ui/ChatParticipantList'
import { ModalLayout } from '@/shared/ui/modal/ModalLayout'
import { ExitChatRoomButton } from '@/widgets/button/ExitChatRoomButton'

import { useIsSidebarOpen, useSidebarActions, useSidebarInformation } from '../model/sidebar.store'

export const ChatSidebar = () => {
  const isSidebarOpen = useIsSidebarOpen()
  const sidebarInformation = useSidebarInformation()

  const { closeSidebar } = useSidebarActions()

  if (!isSidebarOpen || !sidebarInformation) return null

  const participants = [sidebarInformation.author, ...sidebarInformation.participants]

  return (
    <ModalLayout id="chat-sidebar" isOpen={isSidebarOpen} onClose={closeSidebar}>
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
          <ExitChatRoomButton />
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
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'xs')}
    ${theme.margin(0, 'container')}
    ${theme.padding(0, 0, '2xl')}
    ${theme.border('divider', 'bottom')}
  `}

  .title {
    ${({ theme }) => theme.font(400, theme.colors.black[100])};
  }

  .training-date {
    ${({ theme }) => theme.font(800, theme.colors.black[100])};
  }
`

const ParticipantSection = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'lg')}
    ${theme.margin(0, 'container')}
    ${theme.padding('md', 0, 0)}
  `}
  flex-grow: 1;
  overflow: hidden;

  .participant-count {
    ${({ theme }) => theme.font(800, theme.colors.black[100])};
  }
`

const SidebarFooter = styled.div`
  ${({ theme }) => `
    ${theme.gridBox('1fr 1fr', undefined, 'center')}
    ${theme.font(800, theme.colors.black[100])}
  `}
  background-color: ${({ theme }) => theme.colors.black[500]};
`

const CloseButton = styled.button`
  ${({ theme }) => `
    ${theme.padding('md', 'lg')};
    ${theme.font(800, theme.colors.black[100])}
    ${theme.border('divider', 'left')}
  `}
`
