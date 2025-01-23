import { colors } from './colors'

const borderSize = {
  0: 'none',
  divider: `1px solid ${colors.black[100]}`,
  input: `1px solid ${colors.black[200]}`,
  underline: `1px solid ${colors.black[400]}`,
  chain: `10px solid ${colors.black[200]}`,
  'post-addition-button': `2px solid ${colors.black[100]}`,
  'tab-active': `2px solid ${colors.black[500]}`,
  'tab-nonactive': `2px solid ${colors.black[200]}`,
}

const borderRadiusSize = {
  0: '0',
  sm: '8px',
  md: '10px',
  lg: '12px',
  xl: '16px',

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
  'bubble-x': '16px',
  'bubble-y': '10px',
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

type BorderKey = keyof typeof borderSize
type BorderRadiusKey = keyof typeof borderRadiusSize
type BoxShadowKey = keyof typeof boxShadowSize
type PaddingKey = keyof typeof paddingSize
type MarginKey = keyof typeof marginSize

type BorderDirection = 'top' | 'right' | 'bottom' | 'left'

export const border = (size: BorderKey = 0, ...directions: BorderDirection[]) => {
  if (directions.length === 0) return `border: ${borderSize[size]};`
  return directions.map((direction) => `border-${direction}: ${borderSize[size]};`).join(' ')
}

export const borderRadius = (...args: BorderRadiusKey[]) => {
  if (args.length === 0) return ''

  const getValue = (size: BorderRadiusKey) => borderRadiusSize[size] || size
  const values = args.map(getValue)

  return `border-radius: ${values.join(' ')};`
}

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

export type BorderType = typeof border
export type BorderRadiusType = typeof borderRadius
export type BoxShadowType = typeof boxShadow
export type PaddingType = typeof padding
export type MarginType = typeof margin
