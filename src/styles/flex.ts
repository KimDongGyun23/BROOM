export const flexBox = (
  direction = 'row',
  alignItems = 'center',
  justifyContent = 'center',
  gap = '0',
) => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    gap: ${gap};
`

export type FlexBoxType = typeof flexBox
