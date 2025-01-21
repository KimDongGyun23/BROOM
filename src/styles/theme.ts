import { borderRadius, boxShadow, gap } from './box'
import { colors } from './colors'
import { flexBox } from './flex'
import { fontSize, lineHeight } from './font'

const theme = {
  fontSize,
  lineHeight,
  colors,
  borderRadius,
  boxShadow,
  gap,
  flexBox,
}

export default theme
export type Theme = typeof theme
