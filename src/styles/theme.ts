import { borderRadius, boxShadow, gap } from './box'
import { colors } from './colors'
import { fontSize, lineHeight } from './font'

const theme = {
  fontSize,
  lineHeight,
  colors,
  borderRadius,
  boxShadow,
  gap,
} as const

export default theme
