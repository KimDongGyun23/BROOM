import type { PropsWithChildren } from 'react'

import { Input, TextArea, TimeInput, UnitInput } from './Input'
import { Label } from './Label'
import { SortOfArmy } from './Select'

const Container = ({ children }: PropsWithChildren) => {
  return <section className="flex-column w-full gap-[10px]">{children}</section>
}

export const InputGroup = Object.assign(Container, {
  Input,
  TextArea,
  UnitInput,
  TimeInput,
  Label,
  SortOfArmy,
})
