import styled from 'styled-components'

import { PostItem } from '@/entities/board/ui/PostItem'

export const FirstOnboarding = () => {
  return (
    <Container>
      <FrontBox />
      <PostItem
        item={{
          status: {
            createdAt: '18:23',
            boardId: '',
            currentPersonnel: 3,
            totalPersonnel: 4,
            bookmark: false,
          },
          content: {
            title: '광운대 택시 출발',
            trainingDate: '05/21',
            place: '구정문',
            time: '07:30',
          },
        }}
      />
      <PostItem
        item={{
          status: {
            createdAt: '14:51',
            boardId: '',
            currentPersonnel: 1,
            totalPersonnel: 3,
            bookmark: false,
          },
          content: {
            title: '커피 사주면 차 태워줌',
            trainingDate: '05/22',
            place: '광운대역',
            time: '08:00',
          },
        }}
      />

      <TextContainer>
        <p>
          <span>승차 공유</span> 페이지에서
        </p>
        <p>훈련소까지 같이 갈 친구를 구해보아요.</p>
      </TextContainer>
    </Container>
  )
}

const Container = styled.div`
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
