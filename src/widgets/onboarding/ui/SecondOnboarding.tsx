import styled from 'styled-components'

import { ChatMessageItem } from '@/widgets/list/item/ChatMessageItem'

export const SecondOnboarding = () => {
  return (
    <Container>
      <FrontBox />
      <ChatMessageItem
        messageData={{
          messageId: 0,
          message: '안녕하세요!',
          senderNickname: '고로케',
          createdAt: '오후 12:01',
          militaryBranch: 'ARMY',
          dischargeYear: 0,
        }}
      />
      <ChatMessageItem
        messageData={{
          messageId: 0,
          message: '네 안녕하세요. 그럼 저희 한명만 더 구해지면 장소 정해봐요.',
          senderNickname: '구로냐',
          createdAt: '오후 12:03',
          militaryBranch: 'MARINE',
          dischargeYear: 0,
        }}
      />

      <TextContainer>
        <p>
          <span>팀별 채팅</span>을 통해
        </p>
        <p>약속 시간과 장소를 정할 수 있어요.</p>
      </TextContainer>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')}
  position: relative;
  width: 80%;
`

const FrontBox = styled.div`
  position: absolute;
  z-index: 10;
  inset: 0;
`

const TextContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('column', 'center', 'center', 'md')}
    ${theme.font(600, theme.colors.black[500])}
  `}

  margin-top: 20%;

  & span {
    ${({ theme }) => theme.font(500, theme.colors.blue[500])}
  }
`
