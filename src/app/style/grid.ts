const gapSize = {
  0: 0,
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '28px',
}

type GapKey = keyof typeof gapSize

export const gridBox = (
  columns = 'auto',
  rows = 'auto',
  alignItems = 'stretch',
  justifyItems = 'stretch',
  gap: GapKey = 0,
) => `
    display: grid;
    grid-template-columns: ${columns};
    grid-template-rows: ${rows};
    align-items: ${alignItems};
    justify-items: ${justifyItems};
    gap: ${gapSize[gap]};
`

export type GridBoxType = typeof gridBox
