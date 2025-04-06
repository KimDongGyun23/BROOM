import { create } from 'zustand'

type DuplicationCheckStore = {
  isUnique: boolean | null
  resultMessage: string
  actions: {
    setDuplicationCheckState: (isUnique: boolean, resultMessage: string) => void
    clearDuplicationCheckState: VoidFunction
  }
}

const initialValue = {
  isUnique: null,
  resultMessage: '',
}

const createDuplicationCheckStore = () =>
  create<DuplicationCheckStore>((set) => ({
    ...initialValue,
    actions: {
      setDuplicationCheckState: (isUnique, resultMessage) => set({ isUnique, resultMessage }),
      clearDuplicationCheckState: () => set({ ...initialValue }),
    },
  }))

const useNicknameDuplicationCheckStore = createDuplicationCheckStore()

export const useNicknameUniqueState = () =>
  useNicknameDuplicationCheckStore((state) => state.isUnique)
export const useNicknameDuplicationResultMessage = () =>
  useNicknameDuplicationCheckStore((state) => state.resultMessage)
export const useNicknameDuplicationCheckActions = () =>
  useNicknameDuplicationCheckStore((state) => state.actions)

const useIdDuplicationCheckStore = createDuplicationCheckStore()

export const useIdUniqueState = () => useIdDuplicationCheckStore((state) => state.isUnique)
export const useIdDuplicationResultMessage = () =>
  useIdDuplicationCheckStore((state) => state.resultMessage)
export const useIdDuplicationCheckActions = () =>
  useIdDuplicationCheckStore((state) => state.actions)
