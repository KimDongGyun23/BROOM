import type {
  BorderRadiusType,
  BorderType,
  BoxShadowType,
  MarginType,
  PaddingType,
} from './styles/box'
import type { ColorsType } from './styles/colors'
import type { FlexBoxType } from './styles/flex'
import type { FontType } from './styles/font'
import type { GridBoxType } from './styles/grid'

import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: BorderRadiusType
    boxShadow: BoxShadowType
    padding: PaddingType
    colors: ColorsType
    border: BorderType
    flexBox: FlexBoxType
    gridBox: GridBoxType
    font: FontType
    margin: MarginType
  }
}
