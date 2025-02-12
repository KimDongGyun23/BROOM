import styled from 'styled-components'

import { usePostDetail } from '@/stores/post'

export const PostDetailContent = () => {
  const post = usePostDetail()
  if (!post || !post.contentDetail) return

  const { title, trainingDate, place, time, personnel, content } = post.contentDetail

  return (
    <ScrollContainer>
      <ContentContainer>
        <h3 className="title">{title}</h3>
        <ContentList>
          <ContentItem>
            <p className="content-item-label">훈련 날짜</p>
            <p className="content-item-text">{trainingDate}</p>
          </ContentItem>

          <ContentItemContainer>
            <ContentItem>
              <p className="content-item-label">출발 장소</p>
              <p className="content-item-text">{place}</p>
            </ContentItem>
            <ContentItem>
              <p className="content-item-label">출발 시간</p>
              <p className="content-item-text">{time}</p>
            </ContentItem>
          </ContentItemContainer>

          <ContentItem>
            <p className="content-item-label">모집 인원</p>
            <p className="content-item-text">{personnel} 명</p>
          </ContentItem>

          <ContentItem>
            <p className="content-item-label">메모</p>
            <p className="content-item-text">{content}</p>
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
