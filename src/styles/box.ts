const borderRadiusSize = {
  sm: '8px',
  md: '10px',
  lg: '12px',
  full: '100%',
  bubble: '20px',
  chain: '40px',
}

const boxShadowSize = {
  sm: '0 -1px 12px 0 rgba(0, 0, 0, 0.04)',
  md: '0 -1px 6.3px 0 rgba(0, 0, 0, 0.15)',
}

const paddingSize = {
  0: 0,
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '28px',

  chain: '30px',
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

type BorderRadiusKey = keyof typeof borderRadiusSize
type BoxShadowKey = keyof typeof boxShadowSize
type PaddingKey = keyof typeof paddingSize
type MarginKey = keyof typeof marginSize

export const borderRadius = (size: BorderRadiusKey) => `
  border-radius: ${borderRadiusSize[size]};
`

export const boxShadow = (size: BoxShadowKey) => `
  box-shadow: ${boxShadowSize[size]};
`

export const padding = (
  top: PaddingKey,
  right: PaddingKey,
  bottom: PaddingKey,
  left: PaddingKey,
) => `
padding-top: ${paddingSize[top]};
padding-right: ${paddingSize[right]};
padding-bottom: ${paddingSize[bottom]};
padding-left: ${paddingSize[left]};
`

export const margin = (top: MarginKey, right: MarginKey, bottom: MarginKey, left: MarginKey) => `
    margin-top: ${marginSize[top]};
    margin-right: ${marginSize[right]};
    margin-bottom: ${marginSize[bottom]};
    margin-left: ${marginSize[left]};
`

export type BorderRadiusType = typeof borderRadius
export type BoxShadowType = typeof boxShadow
export type PaddingType = typeof padding
export type MarginType = typeof margin
