import styled from 'styled-components'

import { GridContainer, ScrollContainer } from '@/app/style/commonStyles'
import { usePostDetailContent } from '@/features/post-detail/model/postDetail.store'

export const PostDetailContent = () => {
  const post = usePostDetailContent()

  if (!post || !post.contentDetail) return

  const { title, trainingDate, place, time, personnel, content } = post.contentDetail

  return (
    <ScrollContainer>
      <ContentContainer>
        <h3 className="detail-title">{title}</h3>
        <ContentList>
          <ContentItem>
            <p className="item-label">훈련 날짜</p>
            <p className="item-text">{trainingDate}</p>
          </ContentItem>

          <GridContainer>
            <ContentItem>
              <p className="item-label">출발 장소</p>
              <p className="item-text">{place}</p>
            </ContentItem>
            <ContentItem>
              <p className="item-label">출발 시간</p>
              <p className="item-text">{time}</p>
            </ContentItem>
          </GridContainer>

          <ContentItem>
            <p className="item-label">모집 인원</p>
            <p className="item-text">{personnel} 명</p>
          </ContentItem>

          <ContentItem>
            <p className="item-label">메모</p>
            <p className="item-text">{content}</p>
          </ContentItem>
        </ContentList>
      </ContentContainer>
    </ScrollContainer>
  )
}

const ContentContainer = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, '2xl')}
    ${theme.padding(0, 'lg')}
  `}

  .detail-title {
    ${({ theme }) => theme.font(500, theme.colors.black[600])}
  }
`

const ContentList = styled.ul`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, '2xl')}
`

const ContentItem = styled.li`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xs')}
  width: 100%;

  .item-label {
    ${({ theme }) => theme.font(800, theme.colors.black[600])}
  }

  .item-text {
    ${({ theme }) => theme.font(600, theme.colors.black[400])}
  }
`
