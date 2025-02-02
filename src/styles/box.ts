import { colors } from './colors'

const gap = {
  0: 0,
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
}

const sizeMap = {
  'box-shadow': {
    sm: '0 -1px 12px 0 rgba(0, 0, 0, 0.04)',
    md: '0 -1px 6.3px 0 rgba(0, 0, 0, 0.15)',
  },
  border: {
    0: 'none',
    divider: `1px solid ${colors.black[100]}`,
    input: `1px solid ${colors.black[200]}`,
    underline: `1px solid ${colors.black[400]}`,
    chain: `10px solid ${colors.black[100]}`,
    'post-addition-button': `2px solid ${colors.black[100]}`,
    'tab-active': `2px solid ${colors.black[500]}`,
    'tab-nonactive': `2px solid ${colors.black[200]}`,
  },
  'border-radius': {
    ...gap,
    full: '100%',
    bubble: '20px',
    chain: '40px',
  },
  padding: {
    ...gap,
    chain: '14px 30px 14px 18px',
    modal: '36px 0',
    'bubble-x': '16px',
    'bubble-y': '10px',
  },
  margin: {
    ...gap,
    '4xl': '40px',
    auto: 'auto',
    container: '16px',
    'logo-sm': '15svh',
    'logo-lg-top': '30svh',
    'logo-lg-bottom': '30px',
    'page-label-bottom': '48px',
    'mypage-button-top': '3svh',
  },
}

type SizeKey<T extends keyof typeof sizeMap> = keyof (typeof sizeMap)[T]
type Direction = 'top' | 'right' | 'bottom' | 'left'

const createStyleFunction =
  <T extends keyof typeof sizeMap>(property: T) =>
  (...args: SizeKey<T>[]) => {
    if (args.length === 0) return ''

    const values = args.map((arg) => sizeMap[property][arg] ?? arg)

    return `${property}: ${values.join(' ')};`
  }

export const boxShadow = createStyleFunction('box-shadow')
export const borderRadius = createStyleFunction('border-radius')
export const padding = createStyleFunction('padding')
export const margin = createStyleFunction('margin')

export const border = (size: SizeKey<'border'> = 0, ...directions: Direction[]) => {
  if (directions.length === 0) return `border: ${sizeMap.border[size]};`

  return directions.map((direction) => `border-${direction}: ${sizeMap.border[size]};`).join(' ')
}

export type BorderType = typeof border
export type BorderRadiusType = typeof borderRadius
export type BoxShadowType = typeof boxShadow
export type PaddingType = typeof padding
export type MarginType = typeof margin
