export type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U

export type SvgIconProps = {
  size?: string
  active?: boolean
}

export type StepProps = {
  label: string
}

export type Search = {
  search: string
}

export type ChatMessage = {
  message: string
}

export type FieldType = {
  section: string
  label: string
  input: { [fieldName: string]: string }
}
