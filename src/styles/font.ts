const fontSize = {
  100: '36px',
  200: '32px',
  300: '28px',
  400: '24px',
  500: '20px',
  600: '18px',
  700: '16px',
  800: '14px',
  900: '12px',
}

const lineHeight = {
  100: '44px',
  200: '40px',
  300: '36px',
  400: '32px',
  500: '28px',
  600: '26px',
  700: '24px',
  800: '20px',
  900: '16px',
}

type SizeKey = keyof typeof fontSize

export const font = (size: SizeKey, color?: string) => `
    font-size: ${fontSize[size]};
    line-height: ${lineHeight[size]};
    colors: ${color}
`

export type FontType = typeof font
