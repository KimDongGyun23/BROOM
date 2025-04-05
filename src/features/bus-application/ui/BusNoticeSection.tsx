import { styled } from 'styled-components'

import { BUS_NOTICE } from '../config/busNotice.constant'

export const BusNoticeSection = () => {
  return (
    <Container>
      {BUS_NOTICE.map(({ label, contents }, index) => {
        const isSingleItem = contents.length === 1

        return (
          <BusNoticeItem key={index} $isSingleItem={isSingleItem}>
            <Label>{label}</Label>
            <ContentList $isSingleItem={isSingleItem}>
              {contents.map((content) => (
                <Content key={content}>{content}</Content>
              ))}
            </ContentList>
          </BusNoticeItem>
        )
      })}
    </Container>
  )
}

const Container = styled.section`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
`

const BusNoticeItem = styled.div<{ $isSingleItem: boolean }>`
  ${({ theme, $isSingleItem }) =>
    theme.flexBox(
      $isSingleItem ? 'row' : 'column',
      $isSingleItem ? 'center' : 'stretch',
      undefined,
      !$isSingleItem ? 'lg' : undefined,
    )};
`

const Label = styled.h6`
  ${({ theme }) => `
      ${theme.margin(0, 'xl', 0, 0)}
      ${theme.font(600, theme.colors.black[600])}
    `}
  flex-shrink: 0;
`

const ContentList = styled.ul<{ $isSingleItem: boolean }>`
  ${({ theme, $isSingleItem }) => `
      ${theme.flexBox('column', undefined, undefined, 'sm')}
      ${theme.margin(0, 0, 0, $isSingleItem ? 0 : 'xl')}
      list-style-type: ${$isSingleItem ? 'none' : 'disc'};
    `}
`

const Content = styled.li`
  ${({ theme }) => theme.font(800, theme.colors.black[400])};
`
