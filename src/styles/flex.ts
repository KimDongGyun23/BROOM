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

export const flexBox = (
  direction = 'row',
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  gap: GapKey = 0,
) => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    gap: ${gapSize[gap]};
`

export type FlexBoxType = typeof flexBox
