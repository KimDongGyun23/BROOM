import styled, { css } from 'styled-components'

type Position = [top?: number, right?: number, bottom?: number, left?: number]

type KebabItemProps = {
  label: string
  onClick: VoidFunction
  isRed?: boolean
}

const KebabItem = ({ label, onClick, isRed, isLast }: KebabItemProps & { isLast: boolean }) => (
  <li>
    <KebabButton type="button" onClick={onClick} $isRed={isRed}>
      {label}
    </KebabButton>
    {!isLast && <KebabDivider aria-hidden="true" />}
  </li>
)

type KebabProps = {
  items: KebabItemProps[]
  position: Position
}

export const Kebab = ({ items, position }: KebabProps) => {
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
  position: absolute;
  width: fit-content;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: white;
  padding: ${({ theme }) => `${theme.gap.md} ${theme.gap.lg}`};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  ${({ $position: [top, right, bottom, left] }) => css`
    top: ${top}px;
    right: ${right}px;
    bottom: ${bottom}px;
    left: ${left}px;
  `}
`

const KebabList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`

const KebabButton = styled.button<{ $isRed?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize[800]};
  line-height: ${({ theme }) => theme.lineHeight[800]};
  width: 100%;
  text-align: center;
  color: ${({ theme, $isRed }) => ($isRed ? theme.colors.error : theme.colors.black[500])};
  background: none;
  border: none;
  cursor: pointer;
`

const KebabDivider = styled.hr`
  margin: ${({ theme }) => theme.gap.md} 0;
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black[200]};
  border: none;
`
