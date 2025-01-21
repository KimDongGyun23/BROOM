import { borderRadius, boxShadow, gap, margin } from './box'
import { colors } from './colors'
import { flexBox } from './flex'
import { font } from './font'

const theme = {
  font,
  colors,
  borderRadius,
  boxShadow,
  gap,
  flexBox,
  margin,
}

export default theme
export type Theme = typeof theme
