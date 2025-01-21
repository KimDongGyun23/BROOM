export const borderRadius = {
  sm: '8px',
  md: '10px',
  lg: '12px',
  full: '100%',
}

export const boxShadow = {
  sm: '0 -1px 12px 0 rgba(0, 0, 0, 0.04)',
  md: '0 -1px 6.3px 0 rgba(0, 0, 0, 0.15)',
}

export const gap = {
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '20px',
}

const marginSize = {
  0: 0,
  xs: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '20px',
  xxxl: '40px',
  auto: 'auto',
  container: '16px',

  'logo-top-sm': '15svh',
  'logo-top-lg': '30svh',
  'logo-bottom-sm': '20svh',
  'logo-bottom-lg': '30px',

  'sign-up-form-top': '48px',
  'sign-up-button-bottom': '40px',

  'bus-title-bottom': '48px',

  'mypage-button-top': '3svh',
}

type SizeKey = keyof typeof marginSize

export const margin = (top: SizeKey, right: SizeKey, bottom: SizeKey, left: SizeKey) => `
    margin-top: ${marginSize[top]};
    margin-right: ${marginSize[right]};
    margin-bottom: ${marginSize[bottom]};
    margin-left: ${marginSize[left]};
`

export type BorderRadiusType = typeof borderRadius
export type BoxShadowType = typeof boxShadow
export type GapType = typeof gap
export type MarginType = typeof margin
