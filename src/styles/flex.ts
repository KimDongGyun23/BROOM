export const flexBox = (
  direction = 'row',
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  gap = '0',
) => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    gap: ${gap};
`

export type FlexBoxType = typeof flexBox
