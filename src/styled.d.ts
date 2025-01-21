import type { BorderRadiusType, BoxShadowType, GapType, MarginType } from './styles/box'
import type { ColorsType } from './styles/colors'
import type { FlexBoxType } from './styles/flex'
import type { FontType } from './styles/font'

import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: BorderRadiusType
    boxShadow: BoxShadowType
    gap: GapType
    colors: ColorsType
    flexBox: FlexBoxType
    font: FontType
    margin: MarginType
  }
}
