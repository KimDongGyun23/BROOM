import styled from 'styled-components'

type ContentType = {
  label: string
  content: string | string[]
}

type DetailContentProps = {
  title: string
  contents: ContentType[]
}

const ContentRow = ({ label, content }: ContentType) => {
  if (Array.isArray(content)) {
    return (
      <ContentItemContainer>
        {content.map((item, index) => (
          <ContentItem key={index}>
            <p className="content-item-label">{label}</p>
            <p className="content-item-text">{item}</p>
          </ContentItem>
        ))}
      </ContentItemContainer>
    )
  }
  return (
    <ContentItem>
      <p className="content-item-label">{label}</p>
      <p className="content-item-text">{content}</p>
    </ContentItem>
  )
}

export const PostDetailContent = ({ title, contents }: DetailContentProps) => {
  return (
    <ScrollContainer>
      <ContentContainer>
        <h3 className="title">{title}</h3>
        <ContentList>
          {contents.map((content, index) => (
            <ContentRow key={index} {...content} />
          ))}
        </ContentList>
      </ContentContainer>
    </ScrollContainer>
  )
}

const ScrollContainer = styled.div`
  margin-top: 24px;
  flex-grow: 1;
  overflow-y: scroll;
`

const ContentContainer = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  padding: 0 ${({ theme }) => theme.gap.xl};

  .title {
    font-size: ${({ theme }) => theme.fontSize[500]};
    line-height: ${({ theme }) => theme.lineHeight[500]};
    color: ${({ theme }) => theme.colors.black[600]};
    margin-bottom: 32px;
  }
`

const ContentList = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, '24px')};
`

const ContentItemContainer = styled.ul`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')}
`

const ContentItem = styled.li`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, theme.gap.xs)};
  width: 100%;

  .content-item-label {
    font-size: ${({ theme }) => theme.fontSize[800]};
    line-height: ${({ theme }) => theme.lineHeight[800]};
    color: ${({ theme }) => theme.colors.black[600]};
  }

  .content-item-text {
    font-size: ${({ theme }) => theme.fontSize[600]};
    line-height: ${({ theme }) => theme.lineHeight[600]};
    color: ${({ theme }) => theme.colors.black[400]};
  }
`
