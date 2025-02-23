import { useState } from 'react'

type UseToggleType = (initialState?: boolean) => [boolean, () => void]

export const useToggle: UseToggleType = (initialState = false) => {
  const [state, setState] = useState<boolean>(initialState)

  const toggle = () => {
    setState((prevState) => !prevState)
  }

  return [state, toggle]
}
