import { border, borderRadius, boxShadow, margin, padding } from './box'
import { colors } from './colors'
import { flexBox } from './flex'
import { font } from './font'

const theme = {
  font,
  colors,
  border,
  borderRadius,
  boxShadow,
  padding,
  flexBox,
  margin,
}

export default theme
export type Theme = typeof theme
