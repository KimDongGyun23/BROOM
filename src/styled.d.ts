import type { BorderRadiusType, BoxShadowType, GapType } from './styles/box'
import type { ColorsType } from './styles/colors'
import type { FlexBoxType } from './styles/flex'
import type { lineHeightType } from './styles/font'

import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: BorderRadiusType
    boxShadow: BoxShadowType
    gap: GapType
    colors: ColorsType
    flexBox: FlexBoxType
    fontSize: fontSizeType
    lineHeight: lineHeightType
  }
}
