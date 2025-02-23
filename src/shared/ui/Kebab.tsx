import styled, { css } from 'styled-components'

type Position = [top?: number, right?: number, bottom?: number, left?: number]

type KebabItemType = {
  label: string
  onClick: VoidFunction
  isRed?: boolean
}

type KebabProps = {
  isOpen: boolean
  items: KebabItemType[]
  position: Position
}

export const Kebab = ({ isOpen, items, position }: KebabProps) => {
  if (!isOpen) return null

  return (
    <Container $position={position} aria-label="추가 옵션">
      <ul>
        {items.map(({ label, onClick, isRed }, index) => (
          <li key={label}>
            <KebabButton
              type="button"
              onClick={onClick}
              $isRed={isRed}
              $isLast={index === items.length - 1}
            >
              {label}
            </KebabButton>
          </li>
        ))}
      </ul>
    </Container>
  )
}

const Container = styled.nav<{ $position: Position }>`
  ${({ theme }) => `
    ${theme.flexBox('column', 'center')};
    ${theme.padding('xs', 'md')};
    ${theme.borderRadius('sm')};
    ${theme.boxShadow('md')};
  `};

  ${({ $position: [top, right, bottom, left] }) => css`
    ${top && `top: ${top}px;`}
    ${right && `right: ${right}px;`}
    ${bottom && `bottom: ${bottom}px;`}
    ${left && `left: ${left}px;`}
  `};

  position: absolute;
  width: fit-content;
  height: fit-content;
  background-color: white;

  & > ul {
    width: 100%;
  }
`

const KebabButton = styled.button<{ $isRed?: boolean; $isLast?: boolean }>`
  ${({ theme, $isRed, $isLast }) => `
    ${theme.padding('md', 0)};
    ${!$isLast && theme.border('divider', 'bottom')};
    ${theme.font(800, $isRed ? theme.colors.error : theme.colors.black[500])};
  `};

  width: 100%;
  text-align: center;
`
