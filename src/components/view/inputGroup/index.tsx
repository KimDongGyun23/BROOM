import { createContext, type PropsWithChildren, useContext } from 'react'
import styled from 'styled-components'

import { DateInput, Input, PasswordInput, PersonnelInput, TextArea, TimeInput } from './Input'
import { Label } from './Label'
import { SortOfArmy } from './Select'

export const InputGroupContext = createContext('')
export const useInputGroupContext = () => {
  const context = useContext(InputGroupContext)

  if (!context) {
    throw new Error('InputGroupContext.* 컴포넌트만 사용 가능합니다.')
  }
  return context
}

const Section = styled.section`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'md')};
  width: 100%;
`

type ContainerProps = {
  section: string
}

const Container = ({ section, children }: PropsWithChildren<ContainerProps>) => {
  return (
    <InputGroupContext.Provider value={section}>
      <Section>{children}</Section>
    </InputGroupContext.Provider>
  )
}

export const InputGroup = Object.assign(Container, {
  Input,
  PasswordInput,
  TextArea,
  PersonnelInput,
  TimeInput,
  DateInput,
  Label,
  SortOfArmy,
})
