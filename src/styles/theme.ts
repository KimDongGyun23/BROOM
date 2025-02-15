import { border, borderRadius, boxShadow, margin, padding } from './box'
import { colors } from './colors'
import { flexBox } from './flex'
import { font } from './font'
import { gridBox } from './grid'

const theme = {
  font,
  colors,
  border,
  borderRadius,
  boxShadow,
  padding,
  flexBox,
  gridBox,
  margin,
}

export default theme
export type Theme = typeof theme
