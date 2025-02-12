import styled, { css } from 'styled-components'

type Position = [top?: number, right?: number, bottom?: number, left?: number]

type KebabItemProps = {
  label: string
  onClick: VoidFunction
  isRed?: boolean
}

const KebabItem = ({ label, onClick, isRed, isLast }: KebabItemProps & { isLast: boolean }) => (
  <li>
    <KebabButton type="button" onClick={onClick} $isRed={isRed} $isLast={isLast}>
      {label}
    </KebabButton>
  </li>
)

type KebabProps = {
  isOpen: boolean
  items: KebabItemProps[]
  position: Position
}

export const Kebab = ({ isOpen, items, position }: KebabProps) => {
  if (!isOpen) return null

  return (
    <KebabNav $position={position} aria-label="추가 옵션">
      <KebabList>
        {items.map((item, index) => (
          <KebabItem
            key={item.label}
            label={item.label}
            onClick={item.onClick}
            isRed={item.isRed}
            isLast={index === items.length - 1}
          />
        ))}
      </KebabList>
    </KebabNav>
  )
}

const KebabNav = styled.nav<{ $position: Position }>`
  ${({ theme }) => theme.flexBox('column', 'center')};
  ${({ theme }) => theme.padding('xs', 'md')};
  ${({ theme }) => theme.borderRadius('sm')};
  ${({ theme }) => theme.boxShadow('md')};
  position: absolute;
  width: fit-content;
  height: fit-content;
  background-color: white;
  ${({ $position: [top, right, bottom, left] }) => css`
    ${top && `top: ${top}px;`}
    ${right && `right: ${right}px;`}
    ${bottom && `bottom: ${bottom}px;`}
    ${left && `left: ${left}px;`}
  `}
`

const KebabList = styled.ul`
  width: 100%;
`

const KebabButton = styled.button<{ $isRed?: boolean; $isLast?: boolean }>`
  ${({ theme, $isRed }) => theme.font(800, $isRed ? theme.colors.error : theme.colors.black[500])};
  ${({ theme }) => theme.padding('md', 0)};
  ${({ theme, $isLast }) => !$isLast && theme.border('divider', 'bottom')};
  width: 100%;
  text-align: center;
`
