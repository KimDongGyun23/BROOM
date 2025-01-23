import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import type { CustomPostDetailType } from '@/types/post'

type DetailContentProps = {
  title: string
  contents: CustomPostDetailType['item']
}

export const PostDetailContent = ({ title, contents }: DetailContentProps) => {
  const { pathname } = useLocation()
  const isCarpoolPage = pathname.includes('carpool')

  return (
    <ScrollContainer>
      <ContentContainer>
        <h3 className="title">{title}</h3>
        <ContentList>
          <ContentItem>
            <p className="content-item-label">훈련 날짜</p>
            <p className="content-item-text">{contents.trainingDate}</p>
          </ContentItem>

          <ContentItemContainer>
            <ContentItem>
              <p className="content-item-label">{isCarpoolPage ? '출발 장소' : '만날 장소'}</p>
              <p className="content-item-text">{contents.place}</p>
            </ContentItem>
            <ContentItem>
              <p className="content-item-label">{isCarpoolPage ? '출발 시간' : '만날 시간'}</p>
              <p className="content-item-text">{contents.time}</p>
            </ContentItem>
          </ContentItemContainer>

          <ContentItem>
            <p className="content-item-label">모집 인원</p>
            <p className="content-item-text">{contents.personnel} 명</p>
          </ContentItem>

          <ContentItem>
            <p className="content-item-label">메모</p>
            <p className="content-item-text">{contents.content}</p>
          </ContentItem>
        </ContentList>
      </ContentContainer>
    </ScrollContainer>
  )
}

const ScrollContainer = styled.div`
  ${({ theme }) => theme.margin('container', 0)};
  flex-grow: 1;
  overflow-y: scroll;
`

const ContentContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, '2xl')};
  ${({ theme }) => theme.padding(0, 'lg')};

  .title {
    ${({ theme }) => theme.font(500, theme.colors.black[600])};
  }
`

const ContentList = styled.ul`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, '2xl')};
`

const ContentItemContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')}
`

const ContentItem = styled.li`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xs')};
  width: 100%;

  .content-item-label {
    ${({ theme }) => theme.font(800, theme.colors.black[600])};
  }

  .content-item-text {
    ${({ theme }) => theme.font(600, theme.colors.black[400])};
  }
`
