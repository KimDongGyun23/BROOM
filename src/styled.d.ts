import type {
  BorderRadiusType,
  BorderType,
  BoxShadowType,
  MarginType,
  PaddingType,
} from './app/style/box'
import type { ColorsType } from './app/style/colors'
import type { FlexBoxType } from './app/style/flex'
import type { FontType } from './app/style/font'
import type { GridBoxType } from './app/style/grid'

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
