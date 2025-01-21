import { borderRadius, boxShadow, gap } from './box'
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
}

export default theme
export type Theme = typeof theme
