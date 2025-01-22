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
  ${({ theme }) => theme.margin('container', 0, 'container', 0)};
  flex-grow: 1;
  overflow-y: scroll;
`

const ContentContainer = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  ${({ theme }) => theme.padding(0, 'lg', 0, 'lg')};

  .title {
    ${({ theme }) => theme.margin(0, 0, 'xxl', 0)};
    ${({ theme }) => theme.font(500, theme.colors.black[600])};
  }
`

const ContentList = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
`

const ContentItemContainer = styled.ul`
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
