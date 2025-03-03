import { styled } from 'styled-components'

import { BUS_NOTICE } from '../config/busNotice.constant'

export const BusNoticeSection = () => {
  return (
    <>
      {BUS_NOTICE.map(({ label, contents }, index) => {
        const isSingleItem = contents.length === 1

        return (
          <BusNoticeItem key={index} $isSingleItem={isSingleItem}>
            <BusNoticeLabel>{label}</BusNoticeLabel>
            <BusNoticeContentList $isSingleItem={isSingleItem}>
              {contents.map((content) => (
                <BusNoticeContent key={content}>{content}</BusNoticeContent>
              ))}
            </BusNoticeContentList>
          </BusNoticeItem>
        )
      })}
    </>
  )
}

const BusNoticeItem = styled.div<{ $isSingleItem: boolean }>`
  ${({ theme, $isSingleItem }) =>
    theme.flexBox(
      $isSingleItem ? 'row' : 'column',
      $isSingleItem ? 'center' : 'stretch',
      undefined,
      !$isSingleItem ? 'lg' : undefined,
    )};
`

const BusNoticeLabel = styled.h6`
  ${({ theme }) => `
      ${theme.margin(0, 'xl', 0, 0)}
      ${theme.font(600, theme.colors.black[600])}
    `}
  flex-shrink: 0;
`

const BusNoticeContentList = styled.ul<{ $isSingleItem: boolean }>`
  ${({ theme, $isSingleItem }) => `
      ${theme.flexBox('column', undefined, undefined, 'sm')}
      ${theme.margin(0, 0, 0, $isSingleItem ? 0 : 'xl')}
      list-style-type: ${$isSingleItem ? 'none' : 'disc'};
    `}
`

const BusNoticeContent = styled.li`
  ${({ theme }) => theme.font(800, theme.colors.black[400])};
`
