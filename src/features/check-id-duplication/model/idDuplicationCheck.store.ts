import { create } from 'zustand'

type Actions = {
  setIdDuplicationCheckState: (isUnique: boolean, resultMessage: string) => void
}

type IdDuplicationCheckStore = {
  isUnique: boolean
  resultMessage: string
  actions: Actions
}

const initialValue = {
  isUnique: false,
  resultMessage: '',
}

const useIdDuplicationCheckStore = create<IdDuplicationCheckStore>((set) => ({
  ...initialValue,
  actions: {
    setIdDuplicationCheckState: (isUnique, resultMessage) => set({ isUnique, resultMessage }),
  },
}))

export const useIdUniqueState = () => useIdDuplicationCheckStore((state) => state.isUnique)
export const useIdDuplicationResultMessage = () =>
  useIdDuplicationCheckStore((state) => state.resultMessage)
export const useIdDuplicationCheckActions = () =>
  useIdDuplicationCheckStore((state) => state.actions)
